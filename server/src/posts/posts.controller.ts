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
    return await this.postsService.getPosts();
  }


  @Post('get-one-post')
  async getPost( @Body() dto: {_id:string}) {
    return await this.postsService.getPost(dto._id);
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
    console.log(binary);
    console.log(dto);

    const images: string[] = binary.images.map((file) => file.filename);
    const bgFolderImages: string = binary.bgFolderImages[0].filename;

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
