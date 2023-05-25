import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsTypeTag } from '../types/types';
import { JwtAuthGuard } from '../authentication/authentication.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('get-posts')
  async getPosts(@Body() { tag }: { tag: PostsTypeTag }) {
    return await this.postsService.getPosts(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-posts')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'bgFolderImages',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 51,
      },
    ]),
  )
  async addPosts(@UploadedFiles() binary, @Body() post) {
    const images: string[] = binary.files.map((file) => file.filename);
    const bgFolderImages: string = binary.bgfiles[0].filename;

    await this.postsService.addPost({
      ...post,
      images,
      bgFolderImages,
    });
    return { message: 'File downloaded' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-posts')
  async deletePosts(@Body() { id }: { id: string }) {
    //  return await this.postsService.deleteFolder(id);
  }
}
