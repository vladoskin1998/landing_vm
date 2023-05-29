import { REALTY, LANGUAGE} from "./enum"

export type PostsTypeTag = REALTY.RENT | REALTY.SALE

export type LanguageType = LANGUAGE.EN | LANGUAGE.BG | LANGUAGE.RO | LANGUAGE.RU

export type RequiredPostFileds = {
    area: string
    district: string
    city: string
    price: string | number
}

export type AdditionalFieldType = { label: string; value: string }

export interface PostsInterface extends RequiredPostFileds {
    _id: string
    additionalFields?: string
    images: string[]
    bgFolderImages: string
    tag: PostsTypeTag
    description: string;

}

export type CommentsType = {
    name: string
    comment: string
}


export type DeviceType = "pc" | "mobile" | "tablet"

export type DecodedToken = {
    exp: number
}

