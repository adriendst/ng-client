import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";
import { AlertData } from "ng_client/component/interface/instanceInterface";

interface PopupInterface{
    alertData : AlertData,
    handleClose : React.MouseEventHandler<HTMLButtonElement>, 
    onValidate : React.MouseEventHandler<HTMLButtonElement>
}

const Popup = ({alertData, handleClose, onValidate} : PopupInterface) => {
    return (
        <div className="modal-alert">
            <div className="alert-delete">
                <div>
                    <div className="m-3">
                        <h4>{i18next.t(alertData.title)}</h4>
                        <p>{i18next.t(alertData.text)}</p>
                        {alertData.data &&
                            alertData.data.map(data => {
                                return <p key={data.category}>{data.category}</p>;
                            })}
                    </div>
                    <div className="d-flex justify-content-end fixed-bottom m-2">
                        <button
                            className="btn btn-outline-primary mr-2"
                            onClick={handleClose}
                        >
                            {i18next.t('Cancel')}
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={onValidate}
                        >
                            {i18next.t(alertData.actionButton)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;