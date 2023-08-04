import React from 'react'
import i18next from 'ng_client/node_modules/i18next/i18next.js';
import { Options } from 'ng_client/component/interface/instanceInterface';

interface SelectInterface {
  options: Options[];
  customWidth?: string;
  icon?: string;
  divSelectClass?: string;
  label?: string;
  selectClass?: string;
  value: string;
  index?: number;
  onChange(event: React.ChangeEvent<HTMLSelectElement>, index?: number): void; 
  title?: string;
}

const Select = ({options, customWidth, icon, divSelectClass, label, selectClass, value, index, onChange, title} : SelectInterface) => {
    if (!options || options.length === 0) {
        return null;
    }
    return (
      <div className="row pb-2" style={{width : `${customWidth}`}}>
        {icon && (
          <div className="col-auto d-flex align-items-center pt-3 pe-1">
            <i className={icon + ' icon-large'}></i>
          </div>
        )}
        <div className={`col ${divSelectClass}`}>
          <label style={{ color: 'rgba(0,0,0,0.54)' }}>{i18next.t(label)}</label>
          <div>
            <select
              className={`form-select ${selectClass} p-0`}
              value={value}
              onChange={index ? (event) => onChange(event,index) : onChange}
              title={i18next.t(title)}
            >
              {options.map(option => (
                <option value={option.value} className="selectOption" key={option.value ? option.value : option.id} id={option.id && option.id.toString()}/*  position={option.position} */>
                  {i18next.t(option.translation)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  export default Select