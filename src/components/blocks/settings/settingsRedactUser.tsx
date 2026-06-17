import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {apiRedactUserName} from "../../../api/user/user.ts";

import {showConfirm} from "../../../utils/modals.ts";

import SettingsBlock from "./settingsBlock.tsx";
import InputUi from "../../ui/InputUi.tsx";
import ButtonUi from "../../ui/ButtonUi.tsx";

import {useUserStore} from "../../../store/useUserStore.ts";
import SettingsRedactPassword from "./settingsRedactPassword.tsx";
import SettingsRedactAvatar from "./settingsRedactAvatar.tsx";

interface Props {
    isVisible: boolean
    setIsVisible: (value:boolean) => void
}

function SettingsRedactUser({isVisible, setIsVisible}: Readonly<Props>) {
    const navigate = useNavigate();

    const {logOut, user} = useUserStore()

    const [name, setName] = useState<string>("")

    const [isVisibleRedact, setIsVisibleRedact] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRedact = async () => {
        const confirm = await showConfirm(
            'Редактирование имени пользователя',
            'Вы действительно хотите редактировать имя пользователя?'
        )

        if (confirm) {
            try {
                setIsLoading(true)

                await apiRedactUserName(name)

                user.name = name
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

    useEffect(() => {
        setName(user.name)
    }, [user])

    useEffect(() => {
        setIsVisibleRedact(name !== user.name && name?.length > 0)
    }, [name])

    return (
        <SettingsBlock isVisible={isVisible} setIsVisible={setIsVisible}>
            <SettingsBlock.Title>Редактирование профиля</SettingsBlock.Title>

            <SettingsBlock.Content className="redact-user row">
                <SettingsRedactAvatar isLoading={isLoading} setIsLoading={setIsLoading}/>

                <div className="redact-user__right col-6 flex flex-column">
                    <InputUi
                        name="name"
                        id="name"
                        title="Имя пользователя"
                        visibleCounter={true}
                        value={name}
                        setValue={setName}
                        className="mb-30"
                    />

                    <SettingsRedactPassword/>

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