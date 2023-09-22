import { AuthenticationService } from './authentication.service';
import { AuthDto, LogouthDto } from './authentication.dto';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
    login(createAuthDto: AuthDto): Promise<string>;
    logout(createLogouthDto: LogouthDto): Promise<{
        message: string;
    }>;
}
