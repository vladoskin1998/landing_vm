export enum REALTY {
    SALE='sale',
    RENT='rent'
}

export type PostsTypeTag = REALTY.RENT | REALTY.SALE


export class PostType {
    area: string;
    district: string;
    city: string;
    price: string | number;
    additionalFields?: { label: string; value: string }[];
    images: string[];
    bgFolderImages: string;
    tag: PostsTypeTag;
  }
  