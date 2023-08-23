import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { IUser } from 'src/user/interface/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: config.get<string>('CLIENT_ID'),
      clientSecret: config.get<string>('CLIENT_SECRET'),
      callbackURL: config.get<string>('CALLBACK_URI'),
      scope: ['identify', 'guilds'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<IUser> {
    const foundUser = await this.userService.findByDiscordId(profile.id);
    if (!foundUser) {
      return await this.userService.create(
        { discordId: profile.id, favoriteSongs: [] },
        accessToken,
      );
    }

    return foundUser;
  }
}
