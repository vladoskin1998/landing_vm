import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication, AuthenticationSchema } from './authentication.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Authentication.name, schema: AuthenticationSchema },
    ]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('JWT_SECRET'); // Получение значения uri
        console.log(`JWT_SECRET-------->: ${uri}`);
        return({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      })},
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService, JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard, AuthenticationService],
})
export class AuthenticationModule {}
