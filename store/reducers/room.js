const initialState = {
  room: '',
  loadingRoom: false,
  errorRoom: false,
  chats: []
}

export default function room(state = initialState,action){
  switch (action.type){
    case "SET_ROOM" :
      return {...state, room: action.payload}
    case "SET_LOADING_ROOM" :
      return {...state, loadingRoom: action.payload}
    case "SET_ERROR_ROOM" :
      return {...state, errorRoom: action.payload}
    default:
      return state
  }
}