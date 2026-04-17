import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);

    // 如果header中没有token，尝试从查询参数获取
    if (!token) {
      token = request.query.token;
    }

    if (!token) {
      throw new UnauthorizedException('未提供认证令牌');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.admin = { id: payload.aid };
      return true;
    } catch {
      throw new UnauthorizedException('认证令牌无效');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    // 支持 Bearer token 格式
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer' && token) {
      return token;
    }

    // 也支持直接传递token（兼容客户端）
    if (token) {
      return authHeader;
    }

    return authHeader;
  }
}
