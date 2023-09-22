"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const mongoose_1 = require("@nestjs/mongoose");
const posts_schema_1 = require("./posts.schema");
const uuid_1 = require("uuid");
const mime = require("mime-types");
const authentication_guard_1 = require("../authentication/authentication.guard");
const authentication_module_1 = require("../authentication/authentication.module");
const fs = require("fs");
const path = require("path");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Posts.name, schema: posts_schema_1.PostsSchema }]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        const uploadDir = path.join(__dirname, '../../', 'uploads');
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir);
                        }
                        cb(null, uploadDir);
                    },
                    filename: (req, file, cb) => {
                        const uniqueSuffix = (0, uuid_1.v4)();
                        const ext = mime.extension(file.mimetype);
                        cb(null, uniqueSuffix + '.' + ext);
                    },
                }),
                limits: {
                    fileSize: 1000000000,
                },
                fileFilter: (req, file, cb) => {
                    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
                        return cb(new Error('Only .jpg.jpeg.png files are allowed!'), false);
                    }
                    cb(null, true);
                },
            }),
            authentication_module_1.AuthenticationModule,
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService, authentication_guard_1.JwtAuthGuard],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map