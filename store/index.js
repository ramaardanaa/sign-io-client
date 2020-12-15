import {createStore,applyMiddleware,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import users from './reducers/users';
import rooms from './reducers/rooms';
import room from './reducers/room';

const reducer = combineReducers({
  users,
  rooms,
  room
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store