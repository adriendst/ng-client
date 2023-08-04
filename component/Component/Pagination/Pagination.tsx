import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";
import Select from 'ng_client/component/Component/Selects/Select/Select'

import {Options} from "ng_client/component/interface/instanceInterface"

interface PaginationInterface{
  onPaginationChange(event : React.ChangeEvent<HTMLSelectElement>): void,
  onRowPerPageChange(event : React.ChangeEvent<HTMLSelectElement>) : void,
  pagination : number,
  rowPerPage : number,
  setPagination(page : number) : void,
  userCount : number
}

const Pagination = ({onPaginationChange, onRowPerPageChange, pagination, rowPerPage, setPagination, userCount} : PaginationInterface) => {

    const [paginationOptions, setPaginationOptions] = React.useState<Options[]>([]);
    const [firstUser, setFirstUser] = React.useState<number>(0);
    const [lastUser, setLastUser] = React.useState<number>(0);

    const rowPerPageOption : Options[] = [
        { value: '10', translation: '10' },
        { value: '25', translation: '25' },
        { value: '50', translation: '50' },
        { value: '100', translation: '100' }
    ];

    React.useEffect(() => {
        const paginationOpt : Options[] = [];
        const totalPages = Math.ceil(userCount / rowPerPage);
        const currentPage = Math.min(pagination, totalPages);

        for (let i = 1; i <= totalPages; i++) {
            paginationOpt.push({ value: i.toString(), translation: `${i}` });
        }

        setPaginationOptions(paginationOpt);
        if (userCount === 0) {
            setFirstUser(0);
        } else {
            setFirstUser((currentPage - 1) * rowPerPage + 1);
        }
        setLastUser(Math.min(currentPage * rowPerPage, userCount));
    }, [rowPerPage, pagination, userCount]);

    return (
        <div className="d-flex justify-content-end flex-wrap" style={{ color: 'rgba(0,0,0,.54)' }}>
          <div className="d-flex">
            <p className="mt-3">{`${i18next.t('Page')}:`}</p>
            <Select
              selectClass="pagination-select"
              divSelectClass="d-flex justify-content-center pt-2"
              options={paginationOptions}
              value={pagination.toString()}
              onChange={onPaginationChange}
            />
          </div>
          <div className="ms-5 d-flex">
            <p className="mt-3">{`${i18next.t('Rows per page')}:`}</p>
            <Select
              selectClass="pagination-select"
              divSelectClass="d-flex justify-content-center pt-2"
              options={rowPerPageOption}
              value={rowPerPage.toString()}
              onChange={onRowPerPageChange}
              customWidth='100px'
            />
          </div>           
          <div className="ms-5 d-flex">
            <div className="">
              <p className="mt-3">{`${firstUser} - ${lastUser} ${i18next.t('of')} ${userCount}`}</p>
            </div>
            <div className="pt-2">
            <button
              className="btn"
              onClick={() => setPagination(pagination - 1)}
              disabled={rowPerPage > userCount || pagination === 1}
            >
              <i className="bi bi-caret-left-fill mb-2"></i>
            </button>
            <button
              className="btn"
              onClick={() => setPagination(pagination + 1)}
              disabled={lastUser === userCount}
            >
              <i className="bi bi-caret-right-fill"></i>
            </button>
            </div>
          </div>
        </div>
      );
}

export default Pagination