import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly ConfigService: ConfigService) {
    super({
      passReqToCallback: false,
    });
  }

  public validate = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (password === this.ConfigService.get<string>('local_pass') && username === "admin") {
      return true
    }
    throw new UnauthorizedException('Usuario y/o contraseña erroneos');
  };
}
