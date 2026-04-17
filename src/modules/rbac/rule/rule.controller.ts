import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { RuleService } from './rule.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('api/v1.rule')
@UseGuards(JwtAuthGuard)
export class RuleController {
  constructor(private ruleService: RuleService) {}

  @Get()
  async getRules() {
    return this.ruleService.getRules();
  }

  @Post('save')
  async saveRule(@Body() body: any) {
    return this.ruleService.saveRule(body);
  }

  @Delete('delete')
  async deleteRule(@Body() body: { id: number }) {
    return this.ruleService.deleteRule(body.id);
  }
}
