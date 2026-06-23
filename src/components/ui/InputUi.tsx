import React, {forwardRef} from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    id: string
    title: string
    visibleCounter?: boolean
    maxLength?: number
    minLength?: number
    value: string
    setValue: (value:string) => void
    className?: string
}

const InputUi = forwardRef<HTMLInputElement, Props>(({
    name,
    id,
    title,
    visibleCounter = true,
    maxLength = 20,
    minLength = 0,
    value,
    setValue,
    className,
}, ref) => {
    return (
        <label className={`input position-relative ${className}`} htmlFor={id}>
            <span className="input__name input__text position-absolute">{title}</span>

            <input type="text"
                   className="input__inp w-100"
                   name={name}
                   id={id}
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   maxLength={maxLength}
                   minLength={minLength}
                   ref={ref}
            />

            {visibleCounter && (
                <span className="input__counter input__text position-absolute">
                    {value?.length || 0} / {maxLength}
                </span>
            )}

            <span className="input__error input__text fields_error position-absolute"
                  id={`${id}-error`}
                  data-js-form-field-errors=""
            ></span>
        </label>
    )
})

export default InputUi;