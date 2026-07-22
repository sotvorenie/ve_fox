import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {UserWithToken} from "@/types/user";

import {apiAuth, apiRegister} from "@api/auth/auth";

import {onSubmit, onBlur, onInput} from "@composables/useFormValidation";
import {showWarning} from "@utils/modals";

import LoadingIcon from "@icons/LoadingIcon";

import {useUserStore} from "@store/useUserStore";
import InputUi from "@ui/InputUi.tsx";

function AuthPage() {
    const navigate = useNavigate();

    const {logIn} = useUserStore()

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isAuth, setIsAuth] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const buttonText = isAuth ? 'Войти' : 'Зарегистрироваться';

    const clear = () => {
        setLogin('')
        setPassword('')
        setName('')

        document.querySelectorAll('.fields_error')?.forEach(el => el.textContent = '')
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit(e.nativeEvent)) {
            try {
                setIsLoading(true)
                const data: UserWithToken = isAuth ?
                    await apiAuth(login, password)
                    : await apiRegister(login, password, name)
                logIn(data)
                navigate('/')
            } catch (err: any) {
                await showWarning(
                    'Ошибка аутентификации',
                    err.message
                )
            } finally {
                setIsLoading(false)
            }
        }
    }

    const goWithoutLogin = () => {
        navigate('/')
    }

    return (
        <div className="auth flex-center flex-column h-100">

            <div className="auth__header flex flex-align-center">
                <button className={`auth__btn hover-color-accent ${isAuth ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => {
                            clear()
                            setIsAuth(true)
                        }}
                        disabled={isLoading}
                >
                    Авторизация
                </button>
                <button className={`auth__btn hover-color-accent ${isAuth ? '' : 'is-active'}`}
                        type="button"
                        onClick={() => {
                            clear()
                            setIsAuth(false)
                        }}
                        disabled={isLoading}
                >Регистрация
                </button>
            </div>

            <form className="auth__form flex flex-column"
                  noValidate
                  method="post"
                  data-js-form=""
                  onSubmit={(e) => {
                      e.preventDefault()
                      submit(e).then(() => {})
                  }}
            >
                <InputUi name="login"
                         id="login"
                         title="Логин"
                         value={login}
                         setValue={setLogin}
                         required
                         autoComplete="username"
                         onBlur={(e) => onBlur(e.nativeEvent)}
                         onInput={(e) => onInput(e.nativeEvent)}
                         minLength={4}
                         maxLength={15}
                         readOnly={isLoading}
                         className="mb-40"
                         isDark
                />

                <InputUi name="password"
                         id="password"
                         title="Пароль"
                         value={password}
                         setValue={setPassword}
                         required
                         onBlur={(e) => onBlur(e.nativeEvent)}
                         onInput={(e) => onInput(e.nativeEvent)}
                         minLength={4}
                         maxLength={15}
                         readOnly={isLoading}
                         className="mb-40"
                         isDark
                />

                {!isAuth && (
                    <InputUi name="name"
                             id="name"
                             title="Имя пользователя"
                             value={name}
                             setValue={setName}
                             required={!isAuth}
                             onBlur={(e) => onBlur(e.nativeEvent)}
                             onInput={(e) => onInput(e.nativeEvent)}
                             minLength={4}
                             maxLength={15}
                             readOnly={isLoading}
                             className="mb-40"
                             isDark
                    />
                )}

                <button className="auth__submit hover-color-accent flex-center recolor-svg"
                        type="submit"
                        disabled={isLoading}
                >
                    {isLoading ? (<LoadingIcon/>) : buttonText}
                </button>

                <button className="auth__submit hover-color-accent"
                        type="button"
                        onClick={goWithoutLogin}
                >Войти как Гость
                </button>
            </form>

        </div>
    )
}

export default AuthPage;