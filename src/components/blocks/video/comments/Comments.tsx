import {useEffect, useState} from "react";

import {CommentsForListResponse} from "@/types/comment.ts";

import {commentsArr} from "@data/countArrays.ts";

import {apiAddNewComment, apiDeleteComment, apiGetVideoComments} from "@api/comment/comment.ts";

import {formatCount} from "@composables/useFormatCount.ts";

import Comment from "@video/comments/Comment.tsx";
import CommentsSort from "@video/comments/CommentsSort.tsx";
import CommentsForm from "@video/comments/CommentsForm.tsx";
import CommentsSkeleton from "@ui/skeletons/CommentsSkeleton.tsx";

import {useVideoStore} from "@store/useVideoStore.ts";
import {useUserStore} from "@store/useUserStore.ts";


function Comments() {
    const {video} = useVideoStore()
    const {isLogged} = useUserStore()

    const [comments, setComments] = useState<CommentsForListResponse[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [hasMore, setHasMore] = useState<number>(false)

    const [commentText, setCommentText] = useState<string>("")
    const [isPopular, setIsPopular] = useState<boolean>(false)

    const clear = () => {
        setIsLoading(true)
        setCommentText('')
        setPage(0)
        setIsPopular(false)
    }

    const getVideoComments = async (setLoading: boolean = true) => {
        try {
            if (setLoading) setIsLoading(true)

            const response = await apiGetVideoComments(video.id, setLoading ? page + 1 : page, 21, !isPopular)
            if (response?.comments) {
                setComments(response.comments)
                setTotal(response.total)
                setPage(response.page)
                setHasMore(response.has_more)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const addNewComment = async () => {
        try {
            const response: CommentsForListResponse = await apiAddNewComment(video.id, commentText)
            if (response) setComments(prev => [response, ...prev])
            setCommentText('')
        } catch (err) {
            console.error(err)
        }
    }

    const deleteComment = async (id: number) => {
        try {
            await apiDeleteComment(id)
            setComments(prev => prev?.filter(c => c.id !== id))
            setTotal(prev => prev - 1)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (video.id < 0) return
        clear()
        getVideoComments().then()
    }, [video.id])

    useEffect(() => {
        if (video.id < 0) return
        getVideoComments(false).then()
    }, [isPopular])

    if (isLoading) return (
        <>
            <p className="text-w600 mb-15">Комментарии</p>
            <CommentsSkeleton/>
        </>
    )

    return (
        <div className="comments">
            <div className="comments__head flex flex-align-center mb-30">
                <span className="comments__number h6">{total} {formatCount(total, commentsArr)}</span>

                <CommentsSort isPopular={isPopular} setIsPopular={setIsPopular}/>
            </div>

            {isLogged && (
                <CommentsForm commentText={commentText}
                              setCommentText={setCommentText}
                              addNewComment={addNewComment}
                />
            )}

            <ul className="comments__list">
                {comments?.map(comment => (
                    <Comment key={comment.id} initialComment={comment} deleteComment={deleteComment}/>
                ))}
            </ul>
        </div>
    )
}

export default Comments;