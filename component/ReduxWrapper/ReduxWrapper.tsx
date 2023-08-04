import * as ReactRedux from 'react-redux'
import React from 'react'
import store from 'ng_client/store'
import AnrRiskAnalysis from 'ng_client/component/AnrRiskAnalysis/AnrRiskAnalysis'

const AnrRiskAnalysisWrapper = () => {
  return (
    <ReactRedux.Provider store={store}>
      <AnrRiskAnalysis />
    </ReactRedux.Provider>
  );
  }