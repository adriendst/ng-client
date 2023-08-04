"use strict";

var initialState = {
  addAssetModalIsShow: false,
  assetImportCenterModalIsShow: false
};
var playlistsSlice = createSlice({
  name: "spotify",
  initialState: initialState,
  reducers: {
    showAddAssetModal: function showAddAssetModal(state, action) {
      state.addAssetModalIsShow = action.payload;
    }
  }
});
//# sourceMappingURL=monarcSlice.ts.map
