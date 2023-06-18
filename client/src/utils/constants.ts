import { LANGUAGE } from "../types/enum"

export const LANGUAGE_LIST = [LANGUAGE.EN, LANGUAGE.BG, LANGUAGE.RO, LANGUAGE.RU]

export const MENU_LIST = [
    "Home",
    "About",
    "Services",
    "Sale",
    "Rent",
    "Reviews",
    "Contacts",
]


export const HREF
    = window.location.hostname === 'localhost'
    	? 'http://localhost:5001/'
    	: 'https://vmestateplovdiv.com';


export const PostField = [
    "area",
    "district",
    "city",
    "price",
    "additionalFields",
    "tag",
]


export const FormatImages = ".jpg, .png, .jpeg"