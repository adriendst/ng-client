import React from 'react'
import i18next from 'ng_client/node_modules/i18next/i18next.js'


interface EmailInputInterface {
  icon: string,
  isCorrectlyFilled: boolean,
  label: string,
  onChange(event : React.ChangeEvent<HTMLInputElement>) : void,
  title: string,
  value: string,
  className? : string
}

const EmailInput = ({icon, isCorrectlyFilled, label, onChange, title, value, className} : EmailInputInterface) => {
  const [firstFocus, setFirstFocus] = React.useState<boolean>(false)
  const [isFocus, setIsFocus] = React.useState<boolean>(false)

  function onBlur() {
    if (!firstFocus) {
      setFirstFocus(true)
    }
    setIsFocus(false)
  }

  function onFocus() {
    setIsFocus(true)
  }

  function onInputChange(event) {
    onChange(event)
  }

  return (
    <div className={`row mb-4 ${className && className}`}>
      {icon && (
        <div className="col-auto d-flex align-items-center pt-3 pe-1">
          <i className={icon + ' icon-large'}></i>
        </div>
      )}
      <div className="col">
        <label style={{ color: 'rgba(0,0,0,0.54)' }} className={`${!isCorrectlyFilled ? 'danger-input' : ''}`}>
          {isFocus || value !== '' ? i18next.t(label) + ' *' : ''}
        </label>
        <div className="">
          <input
            type="text"
            placeholder={isFocus ? undefined : i18next.t(label)}
            className={`form-control custom-placeholder ${!isCorrectlyFilled ? 'danger-input' : ''}`}
            defaultValue={value}
            onChange={onInputChange}
            title={title}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
