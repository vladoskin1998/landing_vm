import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostsTypeTag } from '../types/types';

export type PostsType = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop()
  area: string;

  @Prop()
  district: string;

  @Prop()
  city: string;

  @Prop()
  price: string | number;

  @Prop()
  additionalFields: { label: string; value: string }[];

  @Prop()
  images: string[];

  @Prop()
  bgFolderImages: string;

  @Prop()
  tag: PostsTypeTag;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
