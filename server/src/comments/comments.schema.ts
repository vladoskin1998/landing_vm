import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostsTypeTag } from '../types/types';

export type CommentsType = HydratedDocument<Comments>;

@Schema()
export class Comments {
  @Prop()
  name: string;

  @Prop()
  comment: string;
  

  @Prop({ default: Date.now }) 
  createdAt: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
