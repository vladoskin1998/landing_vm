/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PostsService } from './posts.service';
import { PostDto, ChangeTagDto } from './posts.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): Promise<(import("mongoose").Document<unknown, {}, import("./posts.schema").Posts> & Omit<import("./posts.schema").Posts & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getPost(dto: {
        _id: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./posts.schema").Posts> & Omit<import("./posts.schema").Posts & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addPost(binary: any, dto: PostDto): Promise<{
        message: string;
    }>;
    ChangeTagPost(dto: ChangeTagDto): Promise<{
        message: string;
        currentListPost: (import("mongoose").Document<unknown, {}, import("./posts.schema").Posts> & Omit<import("./posts.schema").Posts & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    deletePost({ id }: {
        id: string;
    }): Promise<{
        message: string;
        currentListPost: (import("mongoose").Document<unknown, {}, import("./posts.schema").Posts> & Omit<import("./posts.schema").Posts & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
}
