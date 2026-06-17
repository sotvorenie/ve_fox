import {useRef} from "react";

import {BASE_URL} from "../../../api/url.ts";

import {UserAvatar} from "../../../types/user.ts";

import {apiRedactUserAvatar} from "../../../api/user/user.ts";

import {showError} from "../../../utils/modals.ts";

import UserIcon from "../../../assets/images/icons/UserIcon.tsx";
import RedactIcon from "../../../assets/images/icons/RedactIcon.tsx";

import {useUserStore} from "../../../store/useUserStore.ts";

interface Props {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

function SettingsRedactAvatar({isLoading, setIsLoading}: Readonly<Props>) {
    const {user} = useUserStore()

    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const handleAvatar = () => {
        if (isLoading) return

        avatarInputRef.current?.click()
    }

    const updateAvatar = async () => {
        if (!avatarInputRef.current) return

        const file = avatarInputRef.current.files?.[0]

        if (file) {
            setIsLoading(true)

            try {
                const response: UserAvatar = await apiRedactUserAvatar(file)

                if (response.new_avatar_url) {
                    user.avatar_url = response.new_avatar_url
                }
            } catch (err) {
                console.error(err)

                await showError(
                    'Ошибка загрузки фото',
                    'Не удалось загрузить аватар..'
                )
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div
            className="redact-user__img-container img-container position-relative recolor-svg col-6 aspect-1 flex-center"
            title="Редактировать аватар"
            onClick={handleAvatar}
        >
            {user.avatar_url ? (<img src={`${BASE_URL}/${user.avatar_url}`} alt=""/>) : (<UserIcon/>)}

            <RedactIcon className="absolute-center tr-opacity z-1 pointer-none"/>

            <input
                type="file"
                className="visually-hidden"
                accept="image/*"
                ref={avatarInputRef}
                onChange={updateAvatar}
            />
        </div>
    )
}

export default SettingsRedactAvatar;