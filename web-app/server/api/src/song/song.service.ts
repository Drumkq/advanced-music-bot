import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISong } from './interfaces/song.interface';
import { Model } from 'mongoose';
import { SongDto } from './dto/song.dto';

@Injectable()
export class SongService {
    constructor(@InjectModel('song') private readonly songModel: Model<ISong>) {}

    async getSongByUrl(url: string): Promise<ISong> {
        const song = await this.songModel.findOne({url});
        if (!song) {
            throw new HttpException('Song with this url dont found', HttpStatus.NOT_FOUND);
        }

        return song;
    }

    async createSong(song: SongDto): Promise<ISong> {
        return await this.songModel.create(song);
    }
}
