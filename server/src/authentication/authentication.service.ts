import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Authentication } from './authentication.schema';
import { AuthDto, LogouthDto } from './authentication.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


//console.log( "--->",bcrypt.hashSync('VeronRealty1221',5),"<---");


@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Authentication.name) private authModel: Model<Authentication>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: AuthDto): Promise<{ token: string }> {
    const { login, password } = dto;

    const user = await this.authModel.findOne({ login });

    if (!user) {
      throw new HttpException('Incorrect login', HttpStatus.NOT_FOUND);
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.signAsync(
      { login },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '1d' },
    );

    await user.updateOne({ token, lastEntered: new Date() });

    return { token };
  }


  async logout(dto: LogouthDto): Promise<void> {
    await this.authModel.findOneAndUpdate(dto, { token: '' });
    return;
  }
}
