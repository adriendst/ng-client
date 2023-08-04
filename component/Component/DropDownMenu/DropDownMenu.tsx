import React from 'react'
import i18next from "ng_client/node_modules/i18next/i18next.js";

interface DropDownMenuInterface{
  name : string,
  onChange() : void,
  show : boolean
}

const DropDownMenu = ({name, onChange, show} : DropDownMenuInterface) => {
  return (
    <div className="d-flex align-items-center justify-content-between ps-3 dropdown">
      <div>{i18next.t(name)}</div>
      <button className="btn" onClick={onChange}>
        <i className={show ? 'bi bi-chevron-up ms-3 icon-large' : 'bi bi-chevron-down ms-3 icon-large'}></i>
      </button>
    </div>
  );
}

export default DropDownMenu