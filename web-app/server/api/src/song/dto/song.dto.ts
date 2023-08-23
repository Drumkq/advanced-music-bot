import { IsString } from 'class-validator';
import { SongType } from '../enum/song.enum';
import { ISong } from '../interface/ISong.interface';

export class SongDto implements ISong {
  @IsString()
  url: string;
  @IsString()
  songType: SongType;
}
