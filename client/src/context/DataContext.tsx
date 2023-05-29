import React, { createContext, useState, useContext, useEffect, type ReactNode, type RefObject } from 'react';
import { $api } from '../api/api';
import { PostsInterface, CommentsType } from '../types/types';

import { AxiosResponse } from 'axios';
import { AppContext } from './AppContext';
const DataContext = createContext<{

    listPost: PostsInterface[];
    listComment: CommentsType[];
}>({
    listPost: [],
    listComment: [],
});

const DataContextProvider = ({ children }: { children: ReactNode }) => {


    const { setLoader } = useContext(AppContext)

    const [listPost, setListPost] = useState<PostsInterface[]>([]);

    const [listComment, setListComment] = useState<CommentsType[]>([]);


    useEffect(() => {
        setLoader(true)
        $api.get('posts/get-posts')
            .then((r: AxiosResponse<PostsInterface[]>): void => {
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


    return <DataContext.Provider value={
        {
            listPost,
            listComment,
        }
    }>
        {children}
    </DataContext.Provider>;
};

export { DataContextProvider, DataContext };
