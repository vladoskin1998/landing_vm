import { PostsTypeTag } from 'src/types/types';

export class PostDto {
  area: string;
  district: string;
  city: string;
  price: string | number;
  additionalFields?: { label: string; value: string }[];
  images?: string[];
  bgFolderImages?: string;
  tag: PostsTypeTag;
}

export class PostsTagDto {
  tag: PostsTypeTag;
}
