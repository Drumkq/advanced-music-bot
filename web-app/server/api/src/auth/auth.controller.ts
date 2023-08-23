import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DiscordGuard } from './passport/discord.guard';
import { User } from './utils/user.decorator';
import { IUser } from 'src/user/interface/user.interface';

@Controller('auth')
export class AuthController {
  @Get('discord/login')
  @UseGuards(DiscordGuard)
  async login(@User() user: IUser) {
    return { msg: 'Logged in' };
  }

  @Get('discord/redirect')
  @UseGuards(DiscordGuard)
  async redirect(@User() user: IUser) {
    return { msg: 'Successfull' };
  }
}
