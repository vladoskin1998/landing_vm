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

  @Post('get-folders')
  async getFolders(@Body() { tag }: { tag: PostsTypeTag }) {
  //  return await this.postsService.getPosts(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-folder')
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
  async addFolder(@UploadedFiles() binary, @Body() body) {
   // const { title, tag }: { title: string; tag: MediaTypeFile } = body;
    // const filenames: string[] = binary.files.map((file) => file.filename);
    // const bgfiles = binary.bgfiles[0].filename;

    // await this.mediaService.addFolder({
    //   title,
    //   filenames,
    //   tag,
    //   bgfiles,
    // });

    // return { message: 'Файл загружен' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-folder')
  async deleteFolder(@Body() { id }: { id: string }) {
  //  return await this.postsService.deleteFolder(id);
  }
}
