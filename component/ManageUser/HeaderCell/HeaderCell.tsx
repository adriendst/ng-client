import React from 'react'
import i18next from 'ng_client/node_modules/i18next/i18next.js'

interface HeaderCellInterface{
  label : string,
  onSortChange(field : string) : void,
  sortField : string,
  sortOrder : string,
  value : string
}

const HeaderCell = ({label, onSortChange, sortField, sortOrder, value} : HeaderCellInterface) => {
    return (
        <th className="header-cell" onClick={() => onSortChange(value)} style={{ cursor: 'pointer' }}>
          <div className="header-cell-content">
            <span style={sortField === value ? {} : { color: 'rgba(0,0,0,.54)' }}>
              {i18next.t(label)}
            </span>
            {sortField === value ? (
              sortOrder === '' ? (
                <i className="bi bi-arrow-up-short icon-large"></i>
              ) : (
                <i className="bi bi-arrow-down-short icon-large"></i>
              )
            ) : (
              <i className="bi bi-arrow-up-short icon-large arrow-icon" style={{ color: 'grey' }}></i>
            )}
          </div>
        </th>
      );
}

export default HeaderCell