import {  Injectable } from '@nestjs/common';
import { Comments } from './comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto } from './comments.dto';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}

  async getComments() {
    return await this.commentsModel.find().sort({ createdAt: -1 });
  }

  async addComment(dto: CommentDto) {
    const comment = await this.commentsModel.create(dto);
    console.log(comment);
    
    return comment
  }

 
  async deleteComment({ id }: { id: string }) {
    return await this.commentsModel.findByIdAndDelete({ _id: id });
  }
}
