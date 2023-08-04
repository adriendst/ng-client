import * as ReactRedux from 'react-redux'
import React from 'react'
import AddAssetModal from "ng_client/component/Component/Modal/AddAssetModal/AddAssetModal";
import AddCategoryModal from "ng_client/component/Component/Modal/AddCategoryModal/AddCategoryModal";
import MOSPImportAssetModal from "ng_client/component/Component/Modal/MOSPImportAssetModal/MOSPImportAssetModal";
import AssetImportCenterModal from "ng_client/component/Component/Modal/AssetImportCenterModal/AssetImportCenterModal";
import CSVFileImportCenterModal from "ng_client/component/Component/Modal/CSVFileImportCenterModal/CSVFileImportCenterModal";
import MonarcLibraryModal from "ng_client/component/Component/Modal/MonarcLibraryModal/MonarcLibraryModal";
import MonarcExportFileModal from "ng_client/component/Component/Modal/MonarcExportFileModal/MonarcExportFileModal";
import AnrRiskAnalysisDragNDrop from "ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop//AnrRiskAnalysisDragNDrop";

import {State} from "ng_client/component/interface/instanceInterface"

const AnrRiskAnalysis = () => {

  const assetModal = ReactRedux.useSelector((state: State) => state.modal.addAssetModalIsShow);
  const categoryModal = ReactRedux.useSelector((state: State) => state.modal.categoryModal.categoryModalIsShow);
  const MOSPModal = ReactRedux.useSelector((state: State) => state.modal.MOSPImportAssetModalIsShow);
  const assetImportModal = ReactRedux.useSelector((state: State) => state.modal.assetImportCenterModalIsShow);
  const CSVFileImportModal = ReactRedux.useSelector((state: State) => state.modal.CSVFileImportModalIsShow);
  const monarcLibraryModal = ReactRedux.useSelector((state: State) => state.modal.monarcLibraryModalIsShow);
  const monarcExportFileModal = ReactRedux.useSelector((state: State) => state.modal.monarcExportFileModalIsShow);

  return (
    <div className="m-2 card">
      {assetModal && <AddAssetModal />}
      {categoryModal && <AddCategoryModal />}
      {MOSPModal && <MOSPImportAssetModal />}
      {assetImportModal && <AssetImportCenterModal />}
      {CSVFileImportModal && <CSVFileImportCenterModal />}
      {monarcLibraryModal && <MonarcLibraryModal />}
      {monarcExportFileModal && <MonarcExportFileModal/>}
  
      <AnrRiskAnalysisDragNDrop />
    </div>
  );
}


export default AnrRiskAnalysis