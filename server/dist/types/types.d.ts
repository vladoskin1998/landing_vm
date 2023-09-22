export declare enum REALTY {
    SALE = "sale",
    RENT = "rent",
    OWN_OBJECT = "own"
}
export type PostsTypeTag = REALTY.RENT | REALTY.SALE | REALTY.OWN_OBJECT;
export declare class PostType {
    area: string;
    district: string;
    city: string;
    price: string | number;
    additionalFields?: {
        label: string;
        value: string;
    }[];
    images: string[];
    bgFolderImages: string;
    tag: PostsTypeTag;
}
