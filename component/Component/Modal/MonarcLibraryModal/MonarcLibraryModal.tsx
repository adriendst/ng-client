import * as ReactRedux from "react-redux";
import React from 'react'

import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";
import i18next from "ng_client/node_modules/i18next/i18next.js";

import { Object } from "ng_client/component/interface/instanceInterface"


const MonarcLibraryModal = () => {
  const [search, setSearch] = React.useState('')

  const [objects, setObjects] = React.useState<Object[]>([])

  const [selectedObject, setSelectedObject] = React.useState<Object | undefined>(undefined)

  const [importMethod, setImportMethod] = React.useState('merge')


  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;

  const nonFormattedToken = localStorage.getItem("ls.auth_token");
  const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

  const headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");

  function onSearchChange(event) {
    setSearch(event.target.value)
  }

  React.useEffect(() => {
    fetch(`api/client-anr/${numero}/objects/import?filter=${search}`, {
      headers: headers
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setObjects(response.objects)
      })
      .catch(error => console.error(error));

  }, [search])

  function selectAsset(object) {

    fetch(`api/client-anr/${numero}/objects/import/${object.uuid}`, {
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setSelectedObject(response)
      })
      .catch(error => console.error(error));
  }

  function importAsset() {
    fetch(`api/client-anr/${numero}/objects/import/${selectedObject.uuid}`, {
      headers: headers,
      method: 'PATCH',
      body: JSON.stringify({ object: selectedObject.uuid, mode: importMethod })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error));
    setSelectedObject(undefined)
  }

  function changeImportMethod() {
    if (importMethod === 'merge') {
      setImportMethod('duplicate')
    }
    else {
      setImportMethod('merge')
    }
  }

  console.log(selectedObject)

  return (
    <div className="modal-alert">
      <div className="modal-user-fullscreen">
        <div className="d-flex justify-content-between primary-backgroundcolor">
          <h4 className="m-3">{i18next.t('Asset import center')}</h4>
          <button className="btn me-2" /* onClick={props.showMonarcLibraryModal}  */style={{ color: 'white' }}>
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
          {selectedObject === undefined ? (
            <div>
              <h3>{i18next.t('List of common MONARC assets')}</h3>
              <InputWithIcon value={search} onChange={onSearchChange} label={i18next.t('Search an asset') + "..."} />
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>{i18next.t('Name')}</th>
                    <th>{i18next.t('Category')}</th>
                    <th>{i18next.t('Asset Type')}</th>
                    <th>{i18next.t('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {objects &&
                    objects.map((object) => {
                      return (
                        <tr>
                          <td>{object.name1}</td>
                          <td>{object.category.label1}</td>
                          <td>{object.asset.description1}</td>
                          <td>
                            <button className="btn btn-outline" onClick={() => selectAsset(object)}>
                              <i className="bi bi-arrow-up-right-square icon-large"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="d-flex">
                <button className="btn btn-outline" onClick={() => setSelectedObject(undefined)}>
                {i18next.t('Back to the list')}
                </button>
                <button className="btn btn-outline" onClick={importAsset}>
                {i18next.t('Import asset')}
                </button>
              </div>
              <div>
                <h4>{selectedObject.name1}</h4>
                <span>{selectedObject.risks?.length} {i18next.t('information risks')}</span>
                <table className="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>{i18next.t('Threat')}</th>
                      <th>{i18next.t('Vulnerability')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedObject.risks?.map((risk) => {
                      return (
                        <tr>
                          <td>{risk.threatLabel1}</td>
                          <td>{risk.vulnLabel1}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonarcLibraryModal