import {createStore,applyMiddleware} from 'redux'
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

const store = createStore(reducer, applyMiddleware(thunk))

export default store