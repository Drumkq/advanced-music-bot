import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Profile } from 'passport-discord';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }
  deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }
}
