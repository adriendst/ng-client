

const store = configureStore({
  reducer: {
    modal: modalReducer,
    riskAnalysis : riskAnalysisReducer
  },
});

export default store