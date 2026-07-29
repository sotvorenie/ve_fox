import {UserBase} from "@/types/user.ts";
import {Meta} from "@/types/meta.ts";

export interface CommentBaseResponse {
    id: number
    text: string
    date: string
    isRedacted: boolean
    isLiked: boolean
    likes: number
    user: UserBase
}

export interface CommentForListResponse extends CommentBaseResponse {
    questionCommentsCount: number
}

export interface CommentsListResponse extends Meta {
    comments: CommentForListResponse[]
}