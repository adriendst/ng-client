const categoryModal = {
  categoryModalIsShow: false,
  categoryModalMode: undefined,
  categoryModalId: undefined
}

const modalInitialState = {
  addAssetModalIsShow: false,
  assetImportCenterModalIsShow: false,
  CSVFileImportModalIsShow: false,
  monarcLibraryModalIsShow: false,
  monarcExportFileModalIsShow: false,
  MOSPImportAssetModalIsShow: false,
  categoryModal: categoryModal
};

const modalSlice = createSlice({
  name: "modal",
  modalInitialState,
  reducers: {
    showAddAssetModal: (state, action) => {
      state.addAssetModalIsShow = action.payload;
    },
    showAssetImportCenterModal: (state, action) => {
      state.assetImportCenterModalIsShow = action.payload;
    },
    showCSVFileImportModal: (state, action) => {
      state.CSVFileImportModalIsShow = action.payload;
    },
    showMonarcLibraryModal: (state, action) => {
      state.monarcLibraryModalIsShow = action.payload;
    },
    showMonarcExportFileModal: (state, action) => {
      state.monarcExportFileModalIsShow = action.payload;
    },
    showMOSPImportAssetModal: (state, action) => {
      state.MOSPImportAssetModalIsShow = action.payload;
    },
    showCategoryModal: (state, action) => {
      state.categoryModal.categoryModalIsShow = action.payload[0];
      state.categoryModal.categoryModalMode = action.payload[1]
      state.categoryModal.categoryModalId = action.payload[2]
    },
  },
});

exports.modalSlice = modalSlice


const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case "modal/showAddAssetModal":
      return { ...state, addAssetModalIsShow: action.payload };
    case "modal/showAssetImportCenterModal":
      return { ...state, assetImportCenterModalIsShow: action.payload };
    case "modal/showCSVFileImportModal":
      return { ...state, CSVFileImportModalIsShow: action.payload };
    case "modal/showMonarcLibraryModal":
      return { ...state, monarcLibraryModalIsShow: action.payload };
    case "modal/showMOSPImportAssetModal":
      return { ...state, MOSPImportAssetModalIsShow: action.payload };
    case "modal/showCategoryModal":
      return { ...state, categoryModal: { categoryModalIsShow: action.payload[0], categoryModalMode: action.payload[1], categoryModalId: action.payload[2] } };
    case "modal/showMonarcExportFileModal":
      return { ...state, monarcExportFileModalIsShow: action.payload };
  }

  return state; // Return the previous state for other actions
};


