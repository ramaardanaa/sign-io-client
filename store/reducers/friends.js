const initialState = {
  friends: [],
  loadingFriends: false,
  errorFriends: false
}

export default function friends (state = initialState, action) {
  switch(action.type) {
    case 'SET_FRIENDS':
      return {...state, friends: action.payload}
    case 'SET_LOADING_FRIEND':
      return {...state, loadingFriends: action.payload}
    case 'SET_ERROR_FRIEND':
      return {...state, errorFriends: action.payload}
    default:
      return state
  }
}