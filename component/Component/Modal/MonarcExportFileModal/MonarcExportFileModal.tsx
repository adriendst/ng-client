import React from 'react'
import i18next from "ng_client/node_modules/i18next/i18next.js";

import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";


const MonarcExportFileModal = () => {

    const [importMethod, setImportMethod] = React.useState('merge')

    const [password, setPassword] = React.useState<string>('')

    const [file, setFile] = React.useState<any>()

    var url = window.location.href;
    var match = url.match(/\/(\d+)\//);
    var numero = match ? match[1] : null;

    const nonFormattedToken = localStorage.getItem("ls.auth_token");
    const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    headers.append("Token", token || "");

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function changeImportMethod() {
        if (importMethod === 'merge') {
            setImportMethod('duplicate')
        }
        else {
            setImportMethod('merge')
        }
    }

    function onChange(event) {
        const file = event.target.files;
        setFile(file)

      }


        function importFile() {
            const formData = new FormData();
            console.log(file)
            formData.append('mode', importMethod);
            // Loop through each file in the fileList and append them individually
            for (let i = 0; i < file.length; i++) {
                formData.append(`file[${i}]`, file[i], file[i].name);
            }
            formData.append('password', password);
        
            fetch(`api/client-anr/${numero}/objects/import`, {
              method: 'POST',
              headers : headers,
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
              });
        }
        return (
            <div className="modal-alert">
                <div className="modal-user-fullscreen">
                    <div className="d-flex justify-content-between primary-backgroundcolor">
                        <h4 className="m-3">{i18next.t('Asset import center')}</h4>
                        <button className="btn me-2" /* onClick={props.showMonarcLibraryModal} */ style={{ color: 'white' }}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="m-4">
                        <div>
                            <span>{i18next.t('Import method')} :</span>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={importMethod === 'merge' ? false : true} onChange={changeImportMethod} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">{i18next.t('By duplicating')}</label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={importMethod === 'merge' ? true : false} onChange={changeImportMethod} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">{i18next.t('By merging')}</label>
                            </div>
                            <span className="assetInfo p-3 my-3">{i18next.t('Only global assets can be imported by merge')}</span>
                        </div>
                        <div>
                            <input type="file" onChange={onChange} />
                            <InputWithIcon onChange={onPasswordChange} value={password} label={i18next.t('Asset password (if any)')} icon={'bi bi-key-fill'} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline" onClick={importFile}>
                                <i className="bi bi-download" />
                                {i18next.t('Import file')}
                            </button>
                        </div>
                        <div className="d-flex justify-content-end align-items-center my-4">
                            <button className="btn btn-outline-secondary">
                                {i18next.t('Cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default MonarcExportFileModal