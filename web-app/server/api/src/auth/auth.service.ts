import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    public async login(req: Request) {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        
    }
}
