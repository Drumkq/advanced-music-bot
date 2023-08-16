import { IsString } from "class-validator";
import { SongType } from "../songType.enum";

export class SongDto {
    @IsString()
    url: string;
    @IsString()
    songType: SongType;
}