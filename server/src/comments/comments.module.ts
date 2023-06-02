import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './comments.schema';
import { JwtAuthGuard } from '../authentication/authentication.guard';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    AuthenticationModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, JwtAuthGuard],
})
export class CommentsModule {}
