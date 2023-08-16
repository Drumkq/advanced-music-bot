import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { User } from 'src/auth/utils/user.decorator';
import { AuthenticatedGuard } from 'src/auth/passport/authenticated.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('patch')
    @UseGuards(AuthenticatedGuard)
    public async patch(@User() user: IUser, @Body() body: UserDto): Promise<IUser> {
        return await this.userService.patch(user.discordId, body);
    }
}
