import {UserBase} from "@/types/user.ts";
import {Meta} from "@/types/meta.ts";

export interface CommentBaseResponse {
    id: number
    text: string
    date: string
    is_redact: boolean
    is_liked: boolean
    likes: number
    user: UserBase
}

export interface CommentForListResponse extends CommentBaseResponse {
    question_comments_count: number
}

export interface CommentsListResponse extends Meta {
    comments: CommentForListResponse[]
}