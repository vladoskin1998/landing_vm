import { PostsTypeTag } from 'src/types/types';
export declare class PostDto {
    area: string;
    district: string;
    city: string;
    price: string | number;
    additionalFields?: {
        label: string;
        value: string;
    }[];
    images?: string[];
    bgFolderImages?: string;
    tag: PostsTypeTag;
}
export declare class PostsTagDto {
    tag: PostsTypeTag;
}
export declare class ChangeTagDto {
    id: string;
    tag: PostsTypeTag;
}
