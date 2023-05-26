import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../authentication/authentication.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostsTagDto, PostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('get-posts')
  async getPosts() {
    console.log('/get-posts');
    
    return await this.postsService.getPosts();
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
  async addPosts(@UploadedFiles() binary, @Body() dto: PostDto) {
    const images: string[] = binary.files.map((file) => file.filename);
    const bgFolderImages: string = binary.bgfiles[0].filename;

    await this.postsService.addPost({
      ...dto,
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
