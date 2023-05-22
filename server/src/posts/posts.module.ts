import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './posts.schema';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import { JwtAuthGuard } from '../authentication/authentication.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadDir = path.join(__dirname, '../../', 'uploads');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
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
    AuthenticationModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtAuthGuard],
})
export class PostsModule {}
