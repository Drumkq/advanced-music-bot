import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-discord';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<IUser>,
        private readonly config: ConfigService
    ) 
    {

    }

    public async create(userDto: UserDto, accessToken: string): Promise<IUser> {
        if (!this.discordUserExists(accessToken)) {
            throw new HttpException('User with this id doenst exists', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userModel.findOne({discordId: userDto.discordId});
        if (foundUser) {
            throw new HttpException('User already exists', HttpStatus.FOUND);
        }

        return await this.userModel.create(userDto);
    }

    public async findByDiscordId(discordId: string): Promise<IUser> {
        return await this.userModel.findOne({discordId}).exec();
    }

    public async findById(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    public async patch(discordId: string, userDto: Omit<UserDto, 'discordId'>): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({discordId}, userDto).exec();
    }

    private async discordUserExists(accessToken: string): Promise<boolean> {
        try {
            const user = await axios.get<Profile>(`${this.config.get<string>('DISCORD_API_ENDPOINT')}/users/@me`, {headers: {Authorization: `Bearer ${accessToken}`}});
            return user.data != null;
        } catch(e) {
            console.log(e);
        }

        return false;
    }
}
