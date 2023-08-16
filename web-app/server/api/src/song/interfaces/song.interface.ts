import { SongType } from "../songType.enum";

export interface ISong {
    url: string;
    songType: SongType;
}