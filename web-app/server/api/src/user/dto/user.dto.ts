import { IsObject, IsString } from 'class-validator';
import { SongDto } from 'src/song/dto/song.dto';
import { IUser } from '../interface/user.interface';

export class UserDto implements IUser {
  @IsString()
  discordId: string;
  @IsObject({ each: true })
  favoriteSongs: SongDto[];
}
