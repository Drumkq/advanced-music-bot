import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { User } from 'src/auth/utils/user.decorator';
import { AuthenticatedGuard } from 'src/auth/passport/authenticated.guard';
import { SongDto } from 'src/song/dto/song.dto';
import { ISong } from 'src/song/interface/ISong.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  public async test(@Body() body: { song: SongDto; id: string }) {
    return await this.userService.removeSong(body.id, body.song);
    //return await this.userService.addSong(body.id, body.song);
  }

  @Post('addSong')
  @UseGuards(AuthenticatedGuard)
  public async addSong(
    @User() user: IUser,
    @Body() song: SongDto,
  ): Promise<ISong[]> {
    return await this.userService.addSong(user.discordId, song);
  }

  @Post('addSongs')
  @UseGuards(AuthenticatedGuard)
  public async addSongs(
    @User() user: IUser,
    @Body() songs: SongDto[],
  ): Promise<ISong[]> {
    return await this.userService.addSongs(user.discordId, songs);
  }

  @Delete('deleteSong')
  @UseGuards(AuthenticatedGuard)
  public async removeSong(
    @User() user: IUser,
    @Body() song: SongDto,
  ): Promise<ISong[]> {
    return await this.userService.removeSong(user.discordId, song);
  }

  @Delete('deleteSongs')
  @UseGuards(AuthenticatedGuard)
  public async removeSongs(
    @User() user: IUser,
    @Body() songs: SongDto[],
  ): Promise<ISong[]> {
    return await this.userService.removeSongs(user.discordId, songs);
  }
}
