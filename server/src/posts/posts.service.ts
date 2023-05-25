import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from './posts.schema';
import { Model } from 'mongoose';
import { PostsTypeTag, PostsType } from 'src/types/types';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private postsModel: Model<Posts>) {}

  async getPosts(tag: PostsTypeTag) {
    return await this.postsModel.find({ tag });
  }

  async addPost(post: PostsType) {
    return await this.postsModel.create(post);
  }

  async deletePost(id: string) {
    const { images, bgFolderImages } = await this.postsModel.findOneAndDelete({
      _id: id,
    });
    await this.deleteFiles([...images, bgFolderImages]);
    return { message: 'Folder is deleted' };
  }

  async deleteFiles(arr: string[]): Promise<void> {
    const uploadsPath = path.join(__dirname, '../../', 'uploads'); // путь к папке uploads

    for (const filename of arr) {
      const filePath = path.join(uploadsPath, filename);
      if (fs.existsSync(filePath)) {
        try {
          await fs.promises.unlink(filePath);
          console.log(`File ${filename} deleted successfully.`);
        } catch (err) {
          console.error(`Failed to delete file ${filename}: ${err}`);
        }
      } else {
        throw new HttpException('not found file', HttpStatus.NOT_FOUND);
      }
    }
  }
}
