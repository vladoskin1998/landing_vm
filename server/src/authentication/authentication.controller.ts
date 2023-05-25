import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AuthenticationService } from './authentication.service';
  import { AuthDto, LogouthDto } from './authentication.dto';
  
  @Controller('authentication')
  export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}
  
    @Post('login')
    async login(@Body() createAuthDto: AuthDto) {
      const { token } = await this.authService.login(createAuthDto);
      if (!token) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return token;
    }
  
    @Post('logout')
    async logout(@Body() createLogouthDto: LogouthDto) {
      await this.authService.logout(createLogouthDto);
      return { message: 'LogOut' };
    }
  }
  