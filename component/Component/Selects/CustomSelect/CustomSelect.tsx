import React from 'react'
import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";
import { Options } from 'ng_client/component/interface/instanceInterface';

interface CustomSelectInterface {
  icon: string,
  label: string,
  language?: number,
  onChange?(event : React.ChangeEvent<HTMLInputElement>) : void,
  onSelect(option: string): void,
  options : Options[],
  value : string,
  isClearable? : boolean
}

const CustomSelect = ({icon, label, language, onChange, onSelect, options, value, isClearable} : CustomSelectInterface) => {
  const [isFocus, setIsFocus] = React.useState(false)

  function handleSelect(option) {
    onSelect(option)
    setIsFocus(false)
  }

  function onClear() {
    setIsFocus(true)
    onClear()
  }

  return (
    <div className='pb-2'>
      <div className="d-flex">
        <div className="flex-grow-1">
          <InputWithIcon
            icon={icon}
            label={label}
            value={value}
            onChange={onChange}
            setIsFocus={setIsFocus}
          />
        </div>
        {value !== '' && isClearable && (
          <i className="bi bi-x-lg pt-4 ps-3" onClick={onClear}></i>
        )}
      </div>
      {isFocus && (
        <div className="customSelect" style={{ position: 'relative' }}>
          {options.map(option => {
            return (
              <div
                key={option.value}
                className="customOption d-flex align-items-center"
                onClick={() => handleSelect(option)}
              >
                {option.value ? `${option.value}` : `${option.code} - ${option[`label${language}`]}`}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSelect