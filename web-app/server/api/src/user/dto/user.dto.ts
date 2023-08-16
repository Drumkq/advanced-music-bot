import { IsObject, IsString } from "class-validator";
import { SongDto } from "src/song/dto/song.dto";

export class UserDto {
    @IsString()
    discordId: string
    @IsObject({each: true})
    favoriteSongs: SongDto[]
}