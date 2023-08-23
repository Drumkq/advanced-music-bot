import { ISong } from 'src/song/interface/ISong.interface';

export interface IUser {
  discordId: string;
  favoriteSongs: ISong[];
}
