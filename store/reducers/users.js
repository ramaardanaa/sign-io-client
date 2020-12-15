const initState = {
  name: '',
  profile_picture: '',
  access_token: '',
  userLoading: false,
  userError: true
}

export default function users(state = initState,action){
  switch (action.type){
    case "SET_TOKEN" :
      return {...state, access_token: action.payload}
    case "SET_NAME" :
      return {...state, name: action.payload}
    case "SET_PICTURE" :
      return {...state, profile_picture: action.payload}
    case "SET_USER_LOADING" :
      return {...state, userLoading: action.payload}
    case "SET_USER_ERROR" :
      return {...state, userError: action.payload}
    default:
      return state
  }
}