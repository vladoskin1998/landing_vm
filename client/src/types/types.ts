import { REALTY } from "./enum"

export type PostsTypeTag = REALTY.RENT | REALTY.SALE

export type PostsType = {
    area: string
    district: string
    city: string
    price: string | number
    additionalFields?: { label: string; value: string }[]
    images: string[]
    bgFolderImages: string
    tag: PostsTypeTag
}

export type CommentsType = {
    name: string
    comment: string
}


export type DeviceType = "pc" | "mobile" | "tablet"

export type DecodedToken = {
    exp: number
}