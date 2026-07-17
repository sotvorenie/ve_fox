import {useRef} from "react";

import {BASE_URL} from "@api/url.ts";

import CommentsInput from "@video/comments/CommentsInput.tsx";

import {useUserStore} from "@store/useUserStore.ts";

interface Props {
    commentText: string
    setCommentText: (text: string) => void
    addNewComment: () => Promise<void>
}

function CommentsForm({commentText, setCommentText, addNewComment}: Readonly<Props>) {
    const {user} = useUserStore()

    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className="comments__form flex flex-align-center gap-10 mb-30">
            <div className="comments__avatar radius-50 img-container">
                <img src={`${BASE_URL}${user?.avatar_url}`} alt=""/>
            </div>

            <CommentsInput commentText={commentText}
                           setCommentText={setCommentText}
                           addNewComment={addNewComment}
                           cancel={() => setCommentText("")}
                           ref={inputRef}
            />
        </div>
    )
}

export default CommentsForm;