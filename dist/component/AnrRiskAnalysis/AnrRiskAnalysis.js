"use strict";

var AnrRiskAnalysis = function AnrRiskAnalysis() {
  var assetModal = ReactRedux.useSelector(function (state) {
    return state.modal.addAssetModalIsShow;
  });
  var categoryModal = ReactRedux.useSelector(function (state) {
    return state.modal.categoryModal.categoryModalIsShow;
  });
  var MOSPModal = ReactRedux.useSelector(function (state) {
    return state.modal.MOSPImportAssetModalIsShow;
  });
  var assetImportModal = ReactRedux.useSelector(function (state) {
    return state.modal.assetImportCenterModalIsShow;
  });
  var CSVFileImportModal = ReactRedux.useSelector(function (state) {
    return state.modal.CSVFileImportModalIsShow;
  });
  var monarcLibraryModal = ReactRedux.useSelector(function (state) {
    return state.modal.monarcLibraryModalIsShow;
  });
  var monarcExportFileModal = ReactRedux.useSelector(function (state) {
    return state.modal.monarcExportFileModalIsShow;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "m-2 card"
  }, assetModal && /*#__PURE__*/React.createElement(AddAssetModal, null), categoryModal && /*#__PURE__*/React.createElement(AddCategoryModal, null), MOSPModal && /*#__PURE__*/React.createElement(MOSPImportAssetModal, null), assetImportModal && /*#__PURE__*/React.createElement(AssetImportCenterModal, null), CSVFileImportModal && /*#__PURE__*/React.createElement(CSVFileImportCenterModal, null), monarcLibraryModal && /*#__PURE__*/React.createElement(MonarcLibraryModal, null), monarcExportFileModal && /*#__PURE__*/React.createElement(MonarcExportFileModal, null), /*#__PURE__*/React.createElement(AnrRiskAnalysisDragNDrop, null));
};
//# sourceMappingURL=AnrRiskAnalysis.js.map
