import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const adminId = payload.aid;

      // 将 adminId 附加到 socket
      client.data.adminId = adminId;

      console.log(`Client connected: ${client.id}, Admin ID: ${adminId}`);
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinZone')
  async handleJoinZone(
    @MessageBody() data: { zone_id: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { zone_id } = data;
    const room = `zone:${zone_id}`;

    // 验证用户是否在该区服有角色
    const adminId = client.data.adminId;
    const character = await this.prisma.character.findFirst({
      where: {
        admin_id: adminId,
        zone_id,
        status: 1,
      },
    });

    if (!character) {
      client.emit('error', { message: '您不在该区服' });
      return;
    }

    // 加入房间
    client.join(room);
    client.emit('joinedZone', { zone_id });
  }

  @SubscribeMessage('leaveZone')
  async handleLeaveZone(
    @MessageBody() data: { zone_id: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { zone_id } = data;
    const room = `zone:${zone_id}`;
    client.leave(room);
    client.emit('leftZone', { zone_id });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { zone_id: number; character_id: number; content: string; type?: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { zone_id, character_id, content, type } = data;
    const adminId = client.data.adminId;

    // 验证角色所有权
    const character = await this.prisma.character.findUnique({
      where: { id: character_id },
    });

    if (!character || character.admin_id !== adminId) {
      client.emit('error', { message: '无权发送消息' });
      return;
    }

    if (character.zone_id !== zone_id) {
      client.emit('error', { message: '角色不在该区服' });
      return;
    }

    // 保存消息到数据库
    const message = await this.prisma.message.create({
      data: {
        character_id,
        zone_id,
        content,
        type: type || 0,
        status: 0,
      },
    });

    // 广播消息到区服房间
    const room = `zone:${zone_id}`;
    this.server.to(room).emit('newMessage', {
      id: message.id,
      character_id,
      zone_id,
      content,
      type: message.type,
      create_time: message.create_time,
    });
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory(
    @MessageBody() data: { zone_id: number; limit?: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { zone_id, limit = 50 } = data;

    const messages = await this.prisma.message.findMany({
      where: { zone_id },
      orderBy: { create_time: 'desc' },
      take: limit,
      select: {
        id: true,
        character_id: true,
        content: true,
        type: true,
        create_time: true,
      },
    });

    client.emit('history', { messages: messages.reverse() });
  }
}
