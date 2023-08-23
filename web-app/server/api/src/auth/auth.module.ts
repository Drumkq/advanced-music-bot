import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './utils/serializer';
import { UserModule } from 'src/user/user.module';
import { DiscordStrategy } from './passport/Discord.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer, DiscordStrategy],
})
export class AuthModule {}
