import React, { createContext, useState, useContext, useEffect, type ReactNode, type RefObject } from 'react';
import { $api } from '../api/api';
import { PostsInterface, CommentsType } from '../types/types';
import { AxiosResponse } from 'axios';
import { AppContext } from './AppContext';
import { REALTY } from '../types/enum';
const DataContext = createContext<{

    listPost: PostsInterface[];
    listComment: CommentsType[];
    isTag: {rent:boolean, sale:boolean}
    deletePost: (id: string) => void
    deleteComment: (id: string) => void
    addComment: (dto: { name: string, comment: string }) => Promise<void>
}>({
    listPost: [],
    listComment: [],
    deletePost: () => { },
    deleteComment: () => { },
    addComment: () => { return Promise.resolve(); },
    isTag: {rent:false, sale:false},
});

const DataContextProvider = ({ children }: { children: ReactNode }) => {


    const { setLoader } = useContext(AppContext)

    const [listPost, setListPost] = useState<PostsInterface[]>([]);

    const [listComment, setListComment] = useState<CommentsType[]>([]);

    const [ isTag, setIsTag] = useState(
        {
            rent: false,
            sale: false,
        }
    )
  
console.log(listComment);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);

                const postsResponse: AxiosResponse<PostsInterface[]> = await $api.get('posts/get-posts');
                setListPost(postsResponse.data);

                const commentsResponse = await $api.get('comments/get-comments');
                setListComment(commentsResponse.data);

                setIsTag({
                    rent: !!postsResponse.data.find(it => it.tag === REALTY.RENT),
                    sale: !!postsResponse.data.find(it => it.tag === REALTY.SALE)
                })
                setLoader(false);
            } catch (error: any) {
                setLoader(false);
                alert(error?.response?.data?.message || 'Error occurred while fetching data get-posts get-comments');
            }
        };

        fetchData();
    }, []);


    const deletePost = (id: string) => {
        setLoader(true)
        $api.post('/posts/delete-posts', { id })
            .then((r: AxiosResponse<{ message: string, currentListPost:PostsInterface[] }>) => {
                setLoader(false)
                setListPost(r.data.currentListPost)
                alert(r.data.message)
            })
            .catch((error) => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred delete-posts');
            }
            )
    }

    const deleteComment = (id: string) => {
        setLoader(true)
        $api.post('/comments/delete-comment', { id })
            .then((r: AxiosResponse<{ message: string, currenListComment: CommentsType[] }>) => {
                setLoader(false)
                setListComment(r.data.currenListComment)
                alert(r.data.message)
            })
            .catch((error) => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred delete-posts');
            }
            )
    }

    const addComment = async (dto: { name: string, comment: string }) => {
        setLoader(true)
        $api.post('/comments/add-comment', dto)
            .then(
                (r: AxiosResponse<{ message: string, comment: CommentsType }>) => {
                    setLoader(false)
                    alert(r.data.message)
                    setListComment(s => ([r.data.comment, ...s]))
                }
            )
            .catch(error => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred add-comment');
            }
            )
    }

    return <DataContext.Provider value={
        {
            listPost,
            listComment,
            deletePost,
            addComment,
            deleteComment,
            isTag
        }
    }>
        {children}
    </DataContext.Provider>;
};

export { DataContextProvider, DataContext };
