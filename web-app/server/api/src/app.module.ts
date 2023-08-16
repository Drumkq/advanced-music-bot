import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    AuthModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    ConfigModule.forRoot({ envFilePath: `.env` }),
    PassportModule.register({ session: true }),
    UserModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
