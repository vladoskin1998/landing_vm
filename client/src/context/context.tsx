import React, { createContext, useState, useRef, useEffect, type ReactNode, type RefObject } from 'react';
import jwt_decode from 'jwt-decode';
import { $api } from '../api/api';
import { PostsTypeTag, PostsType, CommentsType, DeviceType, DecodedToken } from '../types/types';

const AppContext = createContext<{
    device: DeviceType;
    isAuth: string;
    setIsAuth: (a: string) => void;
    listSale: PostsType[];
    listRent: PostsType[];
    listComment: CommentsType[];
}>({
    device: 'pc',
    isAuth: localStorage.getItem('token') || '',
    setIsAuth() { },
    listSale: [],
    listRent: [],
    listComment: [],
});

const ContextProvider = ({ children, refApp }: { children: ReactNode; refApp: RefObject<HTMLDivElement> }) => {

    const [device, setDevice] = useState<DeviceType>('pc');
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || '');

    console.log("isAuth---->",  isAuth);
    

    const [listSale, setListSale] = useState<PostsType[]>([]);
    const [listRent, setListRent] = useState<PostsType[]>([]);
    const [listComment, setListComment] = useState<CommentsType[]>([]);

    // const listRealty = async (tag: PostsTypeTag) => {
    //     $api.post('',)
    // }




    useEffect(() => {

    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (refApp?.current?.offsetWidth !== undefined) {
                if (refApp?.current?.offsetWidth < 450) {
                    setDevice('mobile');
                    document.body.classList.add('no-hover');
                } else if (refApp?.current?.offsetWidth < 950) {
                    setDevice('tablet');
                    document.body.classList.add('no-hover');
                } else {
                    setDevice('pc');
                    document.body.classList.remove('no-hover');
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [refApp?.current?.offsetWidth]);

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            const decodedToken: DecodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setIsAuth('');
            }
        }

        localStorage.setItem('token', isAuth);
    }, [isAuth]);

    return <AppContext.Provider value={
        {
            device,
            isAuth,
            setIsAuth,
            listSale,
            listRent,
            listComment,

        }
    }>
        {children}
    </AppContext.Provider>;
};

export { ContextProvider, AppContext };
