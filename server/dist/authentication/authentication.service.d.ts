import { Model } from 'mongoose';
import { Authentication } from './authentication.schema';
import { AuthDto, LogouthDto } from './authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthenticationService {
    private authModel;
    private readonly jwtService;
    private readonly configService;
    constructor(authModel: Model<Authentication>, jwtService: JwtService, configService: ConfigService);
    login(dto: AuthDto): Promise<{
        token: string;
    }>;
    logout(dto: LogouthDto): Promise<void>;
}
