import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigurationService,
    private userService: UserService,
  ) {
    const { secret } = configService.getJWTConfig();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;

    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
