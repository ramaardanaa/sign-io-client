import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'

const initState = {
  access_token: '',
  group:[]
}

function reducer(state = initState,action){
  switch (action.type){
    case "SET_TOKEN" :
      return {...state, access_token: action.payload}
    default:
      return state
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store