import * as ReactRedux from 'react-redux'
import React from 'react'
import i18next from "ng_client/node_modules/i18next/i18next.js";

const AssetImportCenterModal = () => {
    const dispatch = ReactRedux.useDispatch()

    function openCSVFileImportModal() {
      dispatch(modalSlice.actions.showCSVFileImportModal(true))
      dispatch(modalSlice.actions.showAssetImportCenterModal(false))
    }

    function openMonarcLibraryModal() {
      dispatch(modalSlice.actions.showMonarcLibraryModal(true))
      dispatch(modalSlice.actions.showAssetImportCenterModal(false))
    }

    function closeAssetImportCenter() {
      dispatch(modalSlice.actions.showAddAssetModal(true))
      dispatch(modalSlice.actions.showAssetImportCenterModal(false))
    }

    function openMonarcExportFileModal(){
      dispatch(modalSlice.actions.showMonarcExportFileModal(true))
      dispatch(modalSlice.actions.showAssetImportCenterModal(false))
    }

    return (
      <div className="modal-alert">
        <div className="asset-import-modal">
          <div className="d-flex justify-content-between primary-backgroundcolor">
            <h4 className="m-3">{i18next.t('Asset import center')}</h4>
            <button className="btn me-2" onClick={closeAssetImportCenter} style={{ color: 'white' }}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="d-flex flex-column align-items-center m-4">
            <button className="btn btn-asset-import" onClick={openCSVFileImportModal}>{i18next.t('CSV file')}</button>
            <button className="btn btn-asset-import my-2" onClick={openMonarcExportFileModal}>{i18next.t('MONARC export file')}</button>
            <button className="btn btn-asset-import" onClick={openMonarcLibraryModal}>{i18next.t('Monarc library')}</button>
          </div>
          <div className="d-flex justify-content-end align-items-center my-4">
            <button className="btn btn-outline-secondary" onClick={closeAssetImportCenter}>{i18next.t('Cancel')}</button>
          </div>
        </div>
      </div>
    );
  }

  export default AssetImportCenterModal
