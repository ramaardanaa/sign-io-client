const initialState = {
  rooms: [],
  roomLoading: false,
  roomError: false
}

export default function rooms(state = initialState,action){
  switch (action.type){
    case "SET_ROOMS" :
      return {...state, rooms: action.payload}
    case "SET_ROOM_LOADING" :
      return {...state, roomLoading: action.payload}
    case "SET_ROOM_ERROR" :
      return {...state, roomError: action.payload}
    default:
      return state
  }
}