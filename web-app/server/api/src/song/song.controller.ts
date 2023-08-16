import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/passport/authenticated.guard';
import { SongService } from './song.service';
import { ISong } from './interfaces/song.interface';
import { SongDto } from './dto/song.dto';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) {}

    @Get('get')
    @UseGuards(AuthenticatedGuard)
    async get(@Body() {url}: {url: string}): Promise<ISong> {
        return await this.songService.getSongByUrl(url);
    }

    @Post('create')
    @UseGuards(AuthenticatedGuard)
    async create(@Body() song: SongDto) {
        return await this.songService.createSong(song);
    }
}
