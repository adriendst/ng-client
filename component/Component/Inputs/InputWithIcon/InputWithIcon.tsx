import React from 'react';
import i18next from 'ng_client/node_modules/i18next/i18next.js';

interface InputWithIconInterface{
  hasToBeFilled? : boolean,
  icon? : string,
  label : string,
  onChange(event : React.ChangeEvent<HTMLInputElement>) : void,
  value : string,
  setIsFocus?(focus : boolean) : void,
  className? : string,
  title? : string
}

const InputWithIcon = ({hasToBeFilled, icon, label, onChange, value, setIsFocus, className, title} : InputWithIconInterface) => {
  const [isFocus, setInputIsFocus] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  function onFocus() {
    setInputIsFocus(true);
    if (setIsFocus) {
      setIsFocus(true);
    }
  }

  function onBlur() {
    setInputIsFocus(false);
    if (value === '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }

  function onInputChange(event) {
    onChange(event);
    if (isFilled === true) {
      setIsFilled(false);
    }
  }

  return (
    <div className={`row d-flex pb-2 ${className && className}`}>
      {icon && (
        <div className="col-auto d-flex align-items-center pt-3 pe-1">
          <i className={icon + ' icon-large'}></i>
        </div>
      )}
      <div className="col">
        <label
          style={{ color: 'rgba(0,0,0,0.54)' }}
          className={`${isFilled && hasToBeFilled ? 'danger-input' : ''}`}
        >
          {isFocus || value !== '' ? i18next.t(label) + (hasToBeFilled ? ' *' : '' ) : ''}
        </label>
        <div className="">
          <input
            type="text"
            placeholder={isFocus ? undefined : i18next.t(label) + (hasToBeFilled ? ' *' : '')}
            className={`form-control custom-placeholder ${isFilled && hasToBeFilled ? 'danger-input' : ''
              }`}
            value={value}
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

export default InputWithIcon;