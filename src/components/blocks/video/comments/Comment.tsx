import {useState} from "react";

import {CommentForListResponse} from "@/types/comment.ts";

import {BASE_URL} from "@api/url.ts";
import {apiEditComment, apiLikeComment} from "@api/comment/comment.ts";

import {formatDateAgo} from "@composables/useFormatDateAgo.ts";

import CommentMenu from "@video/comments/CommentMenu.tsx";
import CommentsInput from "@video/comments/CommentsInput.tsx";

import LikeIcon from "@icons/LikeIcon.tsx";

import {useUserStore} from "@store/useUserStore.ts";
import {LikeResponse} from "@/types/like.ts";

interface Props {
    initialComment: CommentForListResponse
    deleteComment: (id: number) => Promise<void>
}

function Comment({initialComment, deleteComment}: Readonly<Props>) {
    const {user} = useUserStore()

    const [comment, setComment] = useState<CommentForListResponse>(initialComment)
    const [isRedact, setIsRedact] = useState<boolean>(false)
    const [newText, setNewText] = useState<string>('')

    const clear = () => {
        setIsRedact(false)
        setNewText('')
    }

    const handleRedact = () => {
        setNewText(comment.text)
        setIsRedact(true)
    }

    const saveRedact = async () => {
        try {
            const response: CommentForListResponse = await apiEditComment(comment.id, newText)
            if (response) setComment(response)
            clear()
        } catch (err) {
            console.error(err)
        }
    }

    const handleLike = async () => {
        try {
            const response: LikeResponse = await apiLikeComment(comment.id)
            if (response) setComment(prev => ({
                ...prev,
                is_liked: response.is_liked,
                likes: response.is_liked ? prev.likes + 1 : prev.likes - 1
            }))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className="comments__item comment flex gap-10 mb-20 position-relative">
            <div className="comment__avatar img-container radius-50">
                <img src={`${BASE_URL}${comment.user?.avatar_url}`} alt={comment.user?.name}/>
            </div>

            {isRedact ? (
                <CommentsInput commentText={newText}
                               setCommentText={setNewText}
                               addNewComment={saveRedact}
                               cancel={() => {
                                   setNewText('')
                                   setIsRedact(false)
                               }}
                               hideButton={false}
                               ref={(element) => element?.focus()}
                />
            ) : (
                <>
                    <div className="comment__right">
                        <div className="comment__head flex gap-10 flex-align-center line-height-1 fs-14">
                            <span className="comment__name text-w700">{comment.user.name}</span>

                            <div className="comment__date flex">
                                <span className="comment__info">{formatDateAgo(comment.date)}</span>
                                {comment.is_redacted && <span className="comment__info">(изменено)</span>}
                            </div>
                        </div>

                        <p className="comment__text fs-16">{comment.text}</p>

                        {comment.user.id !== user.id && (
                            <div className="comment__actions flex flex-align-center gap-20 line-height-1">
                                <button className={`
                                            comment__like recolor-svg button-width-svg hover-color-accent flex flex-align-center fs-14
                                            ${comment.is_liked ? 'is-liked' : ''}
                                        `}
                                        type="button"
                                        title={comment.is_liked ? 'Убрать оценку' : 'Оценить комментарий'}
                                        onClick={handleLike}
                                >
                                    <LikeIcon/>
                                    {comment.likes > 0 && <span>{comment.likes}</span>}
                                </button>
                                <button className="text-w500 fs-14 hover-color-accent" type="button">Ответить</button>
                            </div>
                        )}
                    </div>

                    {comment.user.id === user.id && (
                        <CommentMenu handleRedact={handleRedact}
                                     deleteComment={() => deleteComment(comment.id)}
                        />
                    )}
                </>
            )}
        </li>
    )
}

export default Comment;