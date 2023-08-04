



const riskAnalysisInitialState = {
    model : undefined,
    categories : undefined,
    languages : [{code: 'fr', flag: 'fr', name: 'French', inDB: true, index: '1'},
    {code: 'en', flag: 'gb', name: 'English', inDB: true, index: '2'},
    {code: 'de', flag: 'de', name: 'German', inDB: true, index: '3'},
    {code: 'nl', flag: 'nl', name: 'Dutch', inDB: true, index: '4'},
    {code: 'es', flag: 'es', name: 'Spanish', inDB: false, index: '5'},
    {code: 'ro', flag: 'ro', name: 'Romanian', inDB: false, index: '6'},
    {code: 'it', flag: 'it', name: 'Italian', inDB: false, index: '7'},
    {code: 'ja', flag: 'jp', name: 'Japanese', inDB: false, index: '8'},
    {code: 'pl', flag: 'pl', name: 'Polish', inDB: false, index: '9'},
    {code: 'pt', flag: 'pt', name: 'Portuguese', inDB: false, index: '10'} ,
    {code: 'zh', flag: 'cn', name: 'Chinese', inDB: false, index : '11'}]
}


const riskAnalysisSlice = createSlice({
    name : 'riskAnalysis',
    riskAnalysisInitialState,
    reducers : {
        setModel : (state, action) => {
            state.model = action.payload
        },
        setCategories : (state, action) => {
            state.categories = action.payload
        }
    }
})

exports.riskAnalysisSlice = riskAnalysisSlice


const riskAnalysisReducer = (state = riskAnalysisInitialState, action) => {
  switch (action.type) {
    case "riskAnalysis/setModel":
      return { ...state, model: action.payload };
      case "riskAnalysis/setCategories":
      return { ...state, categories: action.payload };
    
  }

  return state; // Return the previous state for other actions
};