import React from 'react'
import * as ReactRedux from 'react-redux'
import i18next from "ng_client/node_modules/i18next/i18next.js";
import Popup from "ng_client/component/Component/Popup/Popup";

import { State, Options, Model, ImportedAsset, Asset, RolfTag, AlertData, Payload } from "ng_client/component/interface/instanceInterface"

const CSVFileImportCenterModal = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [fileSchema, setFileSchema] = React.useState(false)

  const [importedAssets, setImportedAssets] = React.useState<ImportedAsset[]>([])

  const [assetsCode, setAssetsCode] = React.useState<string[]>([])
  const [assets, setAssets] = React.useState<Asset[]>([])
  const [operationalRiskTagCode, setOperationalRiskTagCode] = React.useState<string[]>([])
  const [operationalRiskTag, setOperationalRiskTag] = React.useState<RolfTag[]>([])

  const [error, setError] = React.useState(false)

  const [popup, setPopup] = React.useState(false)

  const [alertData, setAlertData] = React.useState<AlertData>({
    title: 'New category',
    actionButton: 'Create & Import'
  })

  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;

  const nonFormattedToken = localStorage.getItem("ls.auth_token");
  const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

  const headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");

  const model: Model = ReactRedux.useSelector((state: State) => state.riskAnalysis.model)
  const categories: Options[] = ReactRedux.useSelector((state: State) => state.riskAnalysis.categories)

  React.useEffect(() => {
    Promise.all([model])
      .then(() => {
        fetch(`api/client-anr/${numero}/assets`, {
          headers: headers
        })
          .then(response => response.json())
          .then(response => {
            let code: string[] = [];
            for (let i = 0; i < response.assets.length; i++) {
              code.push(response.assets[i].code)
            }
            setAssetsCode(code)
            console.log(response.assets)
            setAssets(response.assets)
          })
          .catch(error => console.error(error));

        fetch(`api/client-anr/${numero}/rolf-tags`, {
          headers: headers
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            let code: string[] = [];
            for (let i = 0; i < response.tags.length; i++) {
              code.push(response.tags[i].code)
            }
            setOperationalRiskTagCode(code)
            setOperationalRiskTag(response.tags)
          })
          .catch(error => console.error(error));
      });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function showFileSchema() {
    setFileSchema(!fileSchema)
  }


  function onChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;

        const lines = fileContent?.split('\n');

        // Créer la liste d'objets
        const objects = lines.map((line, index) => {
          if (index !== 0 && index !== lines.length - 1) {
            const columns = line.split(',');

            const object: ImportedAsset = {
              name: columns[0],
              label: columns[1],
              assetTypeCode: columns[2],
              scope: Number(columns[3]),
              operational_risk_tag: columns[4],
              category: columns[5].slice(0, -1),
              categoryExist: true,
              isValid: 0
            };

            const hasMatch = categories.some(category => {
              console.log(category.name)
              console.log(object.category)
              if (category.name?.trim().toLowerCase() === object.category.trim().toLowerCase()) {
                return true;
              }
            });

            if (!hasMatch) {
              object.categoryExist = false
            }
            else {
              object.categoryExist = true
            }


            if (!assetsCode.includes(columns[2])) {
              object.isValid = 1
              setError(true)
            }
            else {
              if (!operationalRiskTagCode.includes(columns[4])) {
                object.isValid = 2
                setError(true)
              }
              else {
                object.isValid = 0
              }
            }
            return object;
          }
        })
          .filter((object): object is ImportedAsset => object !== undefined);

        setImportedAssets(objects)
      };
      reader.readAsText(file);
    }
  }

  React.useEffect(() => {
    if (!error) {
      console.log(importedAssets)
      let categoryToCreate: ImportedAsset[] = [];
      for (let i = 0; i < importedAssets.length; i++) {
        if (!importedAssets[i].categoryExist) {
          categoryToCreate.push(importedAssets[i])
        }
      }
      if (categoryToCreate.length > 0) {
        if (categoryToCreate.length > 1) {
          setAlertData({ ...alertData, text: `Do you want to create ${categoryToCreate.length} new categories ?`, data: categoryToCreate })
        }
        else {
          setAlertData({ ...alertData, text: 'Do you want to create new category ?', data: categoryToCreate })
        }
        setPopup(true)
      }
    }
  }, [importedAssets])



  function createAndImport() {
    let body = { implicitPosition: 2, parent: null, position: null }
    const customLabel = `label${model?.language}`

    let promises: Promise<any>[] = []

    let assetsTypeCode: string[] = []

    let hasCategoryAssets = importedAssets

    if (alertData && alertData.data) {
      for (let i = 0; i < alertData.data.length; i++) {
        body[customLabel] = alertData.data[i].category
        console.log(body)
        assetsTypeCode.push(alertData.data[i].assetTypeCode)
        const promise: Promise<any> = fetch(`api/client-anr/${numero}/objects-categories`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .catch(error => console.error(error));

        promises.push(promise)
        console.log(importedAssets)
        console.log(alertData.data)
        const assetToRemove = importedAssets.find(asset => asset.category === alertData!.data![i]!.category && asset.name === alertData!.data![i]!.name && asset.label === alertData!.data![i]!.label);
        if (assetToRemove) {
          const indexAsset = hasCategoryAssets.indexOf(assetToRemove);
          hasCategoryAssets.splice(indexAsset, 1);
        }
      }
    }

    Promise.all(promises)
      .then(responses => {
        let payload: Payload[] = [];
        for (let i = 0; i < assetsTypeCode.length; i++) {
          let assetId;
          if (assets) {
            for (let j = 0; j < assets.length; j++) {
              if (assetsTypeCode[i] === assets[j].code) {
                assetId = assets[i].uuid
              }
            }
          }
          payload.push({ asset: assetId, category: responses[i].categ.id, implicitPosition: 2, label1: model?.language === 1 ? alertData!.data![i].label : undefined, label2: model?.language === 2 ? alertData!.data![i].label : undefined, label3: model?.language === 3 ? alertData!.data![i].label : undefined, label4: model?.language === 4 ? alertData!.data![i].label : undefined, name1: model?.language === 1 ? alertData!.data![i].name : undefined, name2: model?.language === 2 ? alertData!.data![i].name : undefined, name3: model?.language === 3 ? alertData!.data![i].name : undefined, name4: model?.language === 4 ? alertData!.data![i].name : undefined, mode: undefined, scope: alertData!.data![i].scope })
        }

        for (let i = 0; i < hasCategoryAssets.length; i++) {
          let pay: Payload = { implicitPosition: 2, scope: hasCategoryAssets[i].scope, label1: model?.language === 1 ? hasCategoryAssets[i].label : undefined, label2: model?.language === 2 ? hasCategoryAssets[i].label : undefined, label3: model?.language === 3 ? hasCategoryAssets[i].label : undefined, label4: model?.language === 4 ? hasCategoryAssets[i].label : undefined, name1: model?.language === 1 ? hasCategoryAssets[i].name : undefined, name2: model?.language === 2 ? hasCategoryAssets[i].name : undefined, name3: model?.language === 3 ? hasCategoryAssets[i].name : undefined, name4: model?.language === 4 ? hasCategoryAssets[i].name : undefined, rolfTag: undefined, asset: undefined, category: undefined };
          if (hasCategoryAssets[i].scope == 1) {
            const rolfTag = operationalRiskTag?.find(object => object.code.toLowerCase() === hasCategoryAssets[i].operational_risk_tag.toLowerCase())
            pay.rolfTag = rolfTag?.id
          }
          const asset = assets.find(object => object.code.toLowerCase() === hasCategoryAssets[i].assetTypeCode.toLowerCase())
          pay.asset = asset?.uuid

          const categorie = categories.find(object => object.name!.toLowerCase() === hasCategoryAssets[i].category.toLowerCase())
          pay.category = categorie?.id

          payload.push(pay)
        }

        fetch(`api/client-anr/${numero}/objects`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(response => {
          })
          .catch(error => console.error(error));
      });

    setPopup(false)
    dispatch(modalSlice.actions.showCSVFileImportModal(false))

  }

  function handleClose() {
    setPopup(false)
  }

  function importFile() {

    let payloads: Payload[] = []

    for (let i = 0; i < importedAssets.length; i++) {
      let payload: Payload = { implicitPosition: 2, scope: importedAssets[i].scope, label1: model?.language === 1 ? importedAssets[i].label : undefined, label2: model?.language === 2 ? importedAssets[i].label : undefined, label3: model?.language === 3 ? importedAssets[i].label : undefined, label4: model?.language === 4 ? importedAssets[i].label : undefined, name1: model?.language === 1 ? importedAssets[i].name : undefined, name2: model?.language === 2 ? importedAssets[i].name : undefined, name3: model?.language === 3 ? importedAssets[i].name : undefined, name4: model?.language === 4 ? importedAssets[i].name : undefined, rolfTag: undefined, asset: undefined, category: undefined };
      if (importedAssets[i].scope == 1) {
        const rolfTag = operationalRiskTag.find(object => object.code.toLowerCase() === importedAssets[i].operational_risk_tag.toLowerCase())
        payload.rolfTag = rolfTag?.id
      }
      const asset = assets.find(object => object.code.toLowerCase() === importedAssets[i].assetTypeCode.toLowerCase())
      payload.asset = asset?.uuid

      const categorie = categories.find(object => object.name!.toLowerCase() === importedAssets[i].category.toLowerCase())
      payload.category = categorie?.id

      payloads.push(payload)
    }

    fetch(`api/client-anr/${numero}/objects`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(payloads)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error));

    dispatch(modalSlice.actions.showCSVFileImportModal(false))
  }

  function convertHeadersToCSV(headers) {
    return headers.join(',');
  }

  function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function generateAndDownloadCSV() {
    const headers = ['name', 'label', 'asset type code', 'scope', 'operational risk tag', 'category'];
    const csvContent = convertHeadersToCSV(headers);
    downloadCSV(csvContent, 'ExampleFile.csv');
  }

  const dispatch = ReactRedux.useDispatch()


  function closeCSVFileImportModal() {
    dispatch(modalSlice.actions.showCSVFileImportModal(false))
    dispatch(modalSlice.actions.showAssetImportCenterModal(true))
  }

  return (
    <div className="modal-alert">
      {popup && <Popup alertData={alertData} onValidate={createAndImport} handleClose={handleClose} />}
      <div className={`${windowWidth > 960 ? 'modal-CSV card' : 'fullscreen-modal-CSV card'}`}>
        <div className="d-flex justify-content-between primary-backgroundcolor">
          <h4 className="m-3">{i18next.t('File import center')}</h4>
          <button className="btn me-2" onClick={closeCSVFileImportModal} style={{ color: 'white' }}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="row m-2">
          <div className="col">
            <div className="row align-items-center">
              <div className="col">
                <input type="file" title="File types supported: .csv, .xlsx, .ods, .json" onChange={onChange} />
              </div>
              <div className="col-auto">
                <button className="btn" onClick={showFileSchema}>
                  <i className="bi bi-info-circle-fill"></i>
                </button>
              </div>
            </div>
            <div className="row align-items-center">
              <h5 className="col">{importedAssets.length} {i18next.t('Assets library')}</h5>
              <button className="col-auto btn d-flex align-items-center" disabled={importedAssets.length > 0 ? false : true} onClick={importFile}>
                <i className="bi bi-download icon-large pr-3"></i>
                <span>{i18next.t('Import file')}</span>
              </button>
            </div>
            <div className="row m-2">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>label</th>
                    <th>asset type code</th>
                    <th>scope</th>
                    <th>operational risk tag</th>
                    <th>category</th>
                    {error && <th>error</th>}
                  </tr>
                </thead>
                <tbody>
                  {importedAssets.length > 0 &&
                    importedAssets.map((asset) => {
                      return (
                        <tr key={asset.label} style={{ color: asset.isValid !== 0 ? 'red' : '' }}>
                          <td>{asset.name}</td>
                          <td>{asset.label}</td>
                          <td>{asset.assetTypeCode}</td>
                          <td>{asset.scope}</td>
                          <td>{asset.operational_risk_tag}</td>
                          <td>{!asset.categoryExist ? <span style={{ color: 'red' }}>{asset.category}</span> : asset.category}</td>
                          {asset.isValid !== 0 && <td>{asset.isValid === 1 ? 'the asset type code does not exist. Create it before import' : 'the operational risk tag does not exist. Create it before import'}</td>}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {fileSchema && (
            <div className="col m-3" style={{ border: 'solid' }}>
              <h2>{i18next.t('File Schema')} (csv, xlsx, ods)</h2>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>name</span>
                  <span>[text]</span>
                </div>
                <div>{i18next.t('Example : Desktop Computer, Network and Telecom')}</div>
              </div>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>label</span>
                  <span>[text]</span>
                </div>
                <div>{i18next.t('Example : Any further information')}</div>
              </div>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>asset type code</span>
                  <span>[text]</span>
                </div>
                <div>{i18next.t('Example : Asset type code must exist in the Knowledge Base')}</div>
              </div>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>scope</span>
                  <span>[1,2]</span>
                </div>
                <div>
                  <div>{i18next.t('Example')} :</div>
                  <div>1 : {i18next.t('local')}</div>
                  <div>2 : {i18next.t('global')}</div>
                </div>
              </div>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>operational risk tag</span>
                  <span>[text]</span>
                </div>
                <div>{i18next.t('Example : Only one operational risk tag can be linked and must exist in the Knowledge Base')}</div>
              </div>
              <div className="m-3">
                <div className="d-flex">
                  <span style={{ fontWeight: 'bold' }}>category</span>
                  <span>[text]</span>
                </div>
                <div>{i18next.t('Multiple categories must be separated by a \"double greater than\" (>>)')}</div>
              </div>
              <div className="m-3">Ex : Category1/Category2/Category/3</div>
              <div className="m-3">
                <div>{i18next.t('List of categories')}:</div>
                {categories.map((category) => {
                  return <div className="m-3" key={category.id}>{category.translation}</div>;
                })}
              </div>
              <button className="btn d-flex align-items-center" onClick={generateAndDownloadCSV}>
                <i className="bi bi-download icon-large"></i>{i18next.t('Example file')}
              </button>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center my-4">
          <button className="btn btn-outline-secondary" onClick={closeCSVFileImportModal}>
            {i18next.t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CSVFileImportCenterModal