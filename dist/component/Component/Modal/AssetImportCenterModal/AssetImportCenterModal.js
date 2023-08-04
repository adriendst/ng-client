"use strict";

var AssetImportCenterModal = function AssetImportCenterModal() {
  var dispatch = ReactRedux.useDispatch();
  function openCSVFileImportModal() {
    dispatch(modalSlice.actions.showCSVFileImportModal(true));
    dispatch(modalSlice.actions.showAssetImportCenterModal(false));
  }
  function openMonarcLibraryModal() {
    dispatch(modalSlice.actions.showMonarcLibraryModal(true));
    dispatch(modalSlice.actions.showAssetImportCenterModal(false));
  }
  function closeAssetImportCenter() {
    dispatch(modalSlice.actions.showAddAssetModal(true));
    dispatch(modalSlice.actions.showAssetImportCenterModal(false));
  }
  function openMonarcExportFileModal() {
    dispatch(modalSlice.actions.showMonarcExportFileModal(true));
    dispatch(modalSlice.actions.showAssetImportCenterModal(false));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "asset-import-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, i18next.t('Asset import center')), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2",
    onClick: closeAssetImportCenter,
    style: {
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column align-items-center m-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-asset-import",
    onClick: openCSVFileImportModal
  }, i18next.t('CSV file')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-asset-import my-2",
    onClick: openMonarcExportFileModal
  }, i18next.t('MONARC export file')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-asset-import",
    onClick: openMonarcLibraryModal
  }, i18next.t('Monarc library'))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: closeAssetImportCenter
  }, i18next.t('Cancel')))));
};
//# sourceMappingURL=AssetImportCenterModal.js.map
