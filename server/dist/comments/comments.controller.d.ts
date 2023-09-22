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
import { CommentsService } from './comments.service';
import { CommentDto } from './comments.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getComments(): Promise<(import("mongoose").Document<unknown, {}, import("./comments.schema").Comments> & Omit<import("./comments.schema").Comments & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    addComment(dto: CommentDto): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, {}, import("./comments.schema").Comments> & Omit<import("./comments.schema").Comments & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteComment({ id }: {
        id: string;
    }): Promise<{
        message: string;
        currenListComment: (import("mongoose").Document<unknown, {}, import("./comments.schema").Comments> & Omit<import("./comments.schema").Comments & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
}
