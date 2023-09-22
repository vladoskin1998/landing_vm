"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const authentication_schema_1 = require("./authentication.schema");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const authentication_guard_1 = require("./authentication.guard");
const authentication_service_1 = require("./authentication.service");
const authentication_controller_1 = require("./authentication.controller");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: authentication_schema_1.Authentication.name, schema: authentication_schema_1.AuthenticationSchema },
            ]),
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const uri = configService.get('JWT_SECRET');
                    console.log(`JWT_SECRET-------->: ${uri}`);
                    return ({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1d' },
                    });
                },
            }),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [authentication_service_1.AuthenticationService, jwt_1.JwtService, authentication_guard_1.JwtAuthGuard],
        exports: [jwt_1.JwtModule, authentication_guard_1.JwtAuthGuard, authentication_service_1.AuthenticationService],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map