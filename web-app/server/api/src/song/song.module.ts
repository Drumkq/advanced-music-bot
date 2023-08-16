import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './schema/song.schema';
import { SongService } from './song.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'song', schema: SongSchema }])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
