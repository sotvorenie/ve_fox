import {forwardRef} from "react";

import InputUi from "@ui/InputUi.tsx";
import ButtonUi from "@ui/ButtonUi.tsx";

interface Props {
    commentText: string
    setCommentText: (commentText: string) => void
    addNewComment: () => Promise<void>
    cancel: () => void
    hideButton?: boolean
}

const CommentsInput = forwardRef<HTMLInputElement, Props>(({
    commentText,
    setCommentText,
    addNewComment,
    cancel,
    hideButton = true,
}, inputRef) => {

    return (
        <>
            <InputUi name="comment"
                     className="w-100"
                     id="comment"
                     placeholder="Введите комментарий.."
                     title=""
                     value={commentText}
                     setValue={setCommentText}
                     maxLength={1000}
                     visibleCounter={false}
                     hasCross
                     isTransparent
                     ref={inputRef}
            />

            <div className={`comments__btn-bar row gap-10 ${commentText?.length || !hideButton ? 'is-active' : ''}`}>
                <ButtonUi func={addNewComment}
                          className="comments__btn col-6 is-small"
                          isDisabled={!commentText}
                >
                    Отправить
                </ButtonUi>
                <ButtonUi func={() => {
                              cancel()
                              inputRef.current?.blur()
                          }}
                          className="comments__btn col-6"
                >
                    Отмена
                </ButtonUi>
            </div>
        </>
    )
})

export default CommentsInput;