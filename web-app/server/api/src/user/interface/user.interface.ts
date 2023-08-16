import { ISong } from "src/song/interfaces/song.interface";

export interface IUser {
    discordId: string,
    favoriteSongs: ISong[],
}