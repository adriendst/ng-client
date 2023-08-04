import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";

interface CategorieNameInterface{
  categId : number,
  isShow : boolean,
  label : string,
  updateCategories(id : number) : void
}

const CategorieName = ({categId, isShow, label, updateCategories} : CategorieNameInterface) => {
  return (
    <div
      onClick={() =>updateCategories(categId)}
      id={categId.toString()}
      className="d-flex align-items-center"
      style={{ maxHeight: 20, fontWeight: 'bold' }}
    >
      <span
        style={{
          border: 1,
          backgroundColor: 'rgb(241,241,241)',
          minHeight: '17px',
          minWidth: '17px',
        }}
        className="d-flex align-items-center justify-content-center m-1"
      >
        {isShow ? '-' : '+'}
      </span>
      <span>{label}</span>
    </div>
  );
};

export default CategorieName;