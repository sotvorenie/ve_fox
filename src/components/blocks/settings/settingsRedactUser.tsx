import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import {BASE_URL} from "../../../api/url.ts";

import {UserAvatar} from "../../../types/user.ts";

import {apiRedactUserData, apiRedactUserAvatar} from "../../../api/user/user.ts";

import {showConfirm, showError} from "../../../utils/modals.ts";

import SettingsBlock from "./settingsBlock.tsx";
import InputUi from "../../ui/InputUi.tsx";
import ButtonUi from "../../ui/ButtonUi.tsx";

import RedactIcon from "../../../assets/images/icons/RedactIcon.tsx";
import UserIcon from "../../../assets/images/icons/UserIcon.tsx";

import {useUserStore} from "../../../store/useUserStore.ts";

interface Props {
    isVisible: boolean
    setIsVisible: (value:boolean) => void
}

function SettingsRedactUser({isVisible, setIsVisible}: Readonly<Props>) {
    const navigate = useNavigate();

    const {logOut, user} = useUserStore()

    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const [name, setName] = useState<string>("")
    const [login, setLogin] = useState<string>("")

    const [isVisibleRedact, setIsVisibleRedact] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRedact = async () => {
        const confirm = await showConfirm(
            'Редактирование профиля',
            'Вы действительно хотите редактировать данные профиля?'
        )

        if (confirm) {
            try {
                setIsLoading(true)

                await apiRedactUserData(name, login)

                user.name = name
                user.login = login
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleLogout = async () => {
        const confirm = await showConfirm(
            'Выход из профиля',
            'Вы действительно хотите выйти?'
        )

        if (confirm) {
            logOut()
            navigate('/auth')
        }
    }

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

    useEffect(() => {
        setName(user.name)
        setLogin(user.login)
    }, [user])

    useEffect(() => {
        setIsVisibleRedact(name !== user.name || login !== user.login)
    }, [name, login])

    return (
        <SettingsBlock className={isVisible ? 'is-active' : ''} setIsVisible={setIsVisible}>
            <SettingsBlock.Title>Редактирование профиля</SettingsBlock.Title>

            <SettingsBlock.Content className="redact-user row">
                <div className="redact-user__img-container img-container position-relative recolor-svg col-6 aspect-1 flex-center"
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

                <div className="redact-user__right col-6 flex flex-column">
                    <InputUi
                        name="name"
                        id="name"
                        title="Имя пользователя"
                        visibleCounter={true}
                        value={name}
                        setValue={setName}
                        className="mb-40"
                    />
                    <InputUi
                        name="login"
                        id="login"
                        title="Логин"
                        visibleCounter={true}
                        value={login}
                        setValue={setLogin}
                        className="mb-40"
                    />

                    <ButtonUi
                        className="redact-user__redact w-100 mb-20"
                        func={handleRedact}
                        isDisabled={!isVisibleRedact}
                        isLoading={isLoading}
                    >
                        Редактировать
                    </ButtonUi>

                    <ButtonUi
                        className="redact-user__logout w-100"
                        func={handleLogout}
                        isLoading={isLoading}
                    >
                        Выйти
                    </ButtonUi>
                </div>
            </SettingsBlock.Content>
        </SettingsBlock>
    )
}

export default SettingsRedactUser;