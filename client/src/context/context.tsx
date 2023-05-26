import React, { createContext, useState, useRef, useEffect, type ReactNode, type RefObject } from 'react';
import jwt_decode from 'jwt-decode';
import { $api } from '../api/api';
import { PostsTypeTag, PostsType, CommentsType, DeviceType, DecodedToken } from '../types/types';
import Loader from '../components/ui/Loader';
import { AxiosResponse } from 'axios';

const AppContext = createContext<{
    device: DeviceType;
    isAuth: string;
    setIsAuth: (a: string) => void;
    listPost: PostsType[];
    listComment: CommentsType[];
    loader: boolean;
}>({
    device: 'pc',
    isAuth: localStorage.getItem('token') || '',
    setIsAuth() { },
    listPost: [],
    listComment: [],
    loader: false,
});

const ContextProvider = ({ children, refApp }: { children: ReactNode; refApp: RefObject<HTMLDivElement> }) => {

    const [device, setDevice] = useState<DeviceType>('pc');
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || '');

    const [listPost, setListPost] = useState<PostsType[]>([]);

    const [listComment, setListComment] = useState<CommentsType[]>([]);
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        setLoader(true)
        $api.get('posts/get-posts')
            .then((r: AxiosResponse<PostsType[]>): void => {
                setListPost(r.data)
                setLoader(false)
            }
            )
            .catch(error => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred get-posts');
            }
            )
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
            listPost,
            listComment,
            loader,
        }
    }>
        {children}
    </AppContext.Provider>;
};

export { ContextProvider, AppContext };
