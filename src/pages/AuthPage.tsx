import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Token} from "../types/auth.ts";

import {apiAuth, apiRegister} from "../api/auth/auth.ts";

import {onSubmit, onBlur, onInput} from "../composables/useFormValidation.ts";
import {showWarning} from "../utils/modals.ts";

import LoadingIcon from "../assets/images/icons/LoadingIcon.tsx";

function AuthPage() {
    const navigate = useNavigate();
    const {login} = auth();

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isAuth, setIsAuth] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const clear = () => {
        setUsername('')
        setPassword('')

        document.querySelectorAll('.fields_error')?.forEach(el => el.textContent = '')
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit(e.nativeEvent)) {
            try {
                setIsLoading(true)
                const token: Token = isAuth ? await apiAuth(username, password) : await apiRegister(username, password)
                await login(token.access_token)
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
                <label htmlFor="login" className="auth__label position-relative">
                    <input type="text"
                           id="login"
                           className="auth__input input w-100"
                           placeholder="Логин"
                           required
                           aria-describedby="login-error"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           autoComplete="username"
                           onBlur={(e) => onBlur(e.nativeEvent)}
                           onInput={(e) => onInput(e.nativeEvent)}
                           minLength={4}
                           maxLength={15}
                           readOnly={isLoading}
                    />
                    <span className="auth__error fields_error position-absolute"
                          id="login-error"
                          data-js-form-field-errors=""
                    />
                </label>
                <label htmlFor="password" className="auth__label position-relative">
                    <input type="text"
                           id="password"
                           className="auth__input input w-100"
                           placeholder="Пароль"
                           required
                           aria-describedby="password-error"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onBlur={(e) => onBlur(e.nativeEvent)}
                           onInput={(e) => onInput(e.nativeEvent)}
                           minLength={4}
                           maxLength={15}
                           readOnly={isLoading}
                    />
                    <span className="auth__error fields_error position-absolute"
                          id="password-error"
                          data-js-form-field-errors=""
                    />
                </label>

                <button className="auth__submit hover-color-accent flex-center recolor-svg"
                        type="submit"
                        disabled={isLoading}
                >
                    {isLoading ? (<LoadingIcon/>) : isAuth ? 'Войти' : 'Зарегистрироваться'}
                </button>

                <button className="auth__submit"
                        type="button"
                        onClick={goWithoutLogin}
                >Войти как Гость</button>
            </form>

        </div>
    )
}

export default AuthPage;