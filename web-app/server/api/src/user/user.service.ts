import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-discord';
import { SongDto } from 'src/song/dto/song.dto';
import axios from 'axios';
import { ISong } from 'src/song/interface/ISong.interface';
import lodash from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<IUser>,
    private readonly config: ConfigService,
  ) {}

  public async create(userDto: UserDto, accessToken: string): Promise<IUser> {
    if (!this.discordUserExists(accessToken)) {
      throw new HttpException(
        'User with this id doenst exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundUser = await this.userModel.findOne({
      discordId: userDto.discordId,
    });
    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }

    return await this.userModel.create(userDto);
  }

  public async findByDiscordId(discordId: string): Promise<IUser> {
    return await this.userModel.findOne({ discordId }).exec();
  }

  public async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  public async addSong(
    discordId: string,
    songDto: Readonly<ISong>,
  ): Promise<ISong[]> {
    const user = await this.userModel.findOne({ discordId });
    if (!user) {
      throw new UnauthorizedException();
    }

    user.favoriteSongs.push(songDto);
    await user.save();
    return user.favoriteSongs;
  }

  public async addSongs(
    discordId: string,
    songDtos: readonly ISong[],
  ): Promise<ISong[]> {
    const user = await this.userModel.findOne({ discordId });
    if (!user) {
      throw new UnauthorizedException();
    }

    user.favoriteSongs = lodash.concat(user.favoriteSongs, songDtos);
    await user.save();
    return user.favoriteSongs;
  }

  public async removeSong(
    discordId: string,
    songDto: Readonly<ISong>,
  ): Promise<ISong[]> {
    const user = await this.userModel.findOne({ discordId }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }

    const updatedUser = await user
      .updateOne(
        { $pull: { favoriteSongs: songDto } },
        { safe: true, multi: false },
      )
      .exec();
    return updatedUser.favoriteSongs;
  }

  public async removeSongs(
    discordId: string,
    songDtos: readonly SongDto[],
  ): Promise<ISong[]> {
    const user = await this.userModel.findOne({ discordId }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }

    await user
      .updateOne({
        $pull: {
          favoriteSongs: {
            url: { $in: songDtos.map((v) => v.url) },
            songType: { $in: songDtos.map((v) => v.songType) },
          },
        },
      })
      .exec();
    return user.favoriteSongs;
  }

  public async findSong(discordId: string, songDto: Readonly<SongDto>) {
    const user = await this.findByDiscordId(discordId);
    user.favoriteSongs.find((v) => v === songDto);
  }

  private async discordUserExists(accessToken: string): Promise<boolean> {
    try {
      const user = await axios.get<Profile>(
        `${this.config.get<string>('DISCORD_API_ENDPOINT')}/users/@me`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      return user.data != null;
    } catch (e) {
      console.log(e);
    }

    return false;
  }
}
