import axios from '../../axios/axios'

export function login(payload) {
  return(dispatch) => {
    dispatch({
      type:"SET_USER_LOADING",
      payload: true
    })
    axios({
      method:"post",
      url: "/users/login",
      data:{
        email: payload.email,
        password: payload.password
      }
    })
      .then(({data}) => {
        dispatch({
          type:"SET_TOKEN",
          payload: data.access_token
        })
        dispatch({
          type:"SET_USER_LOADING",
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type:"SET_USER_ERROR",
          payload: true
        })
        dispatch({
          type:"SET_USER_LOADING",
          payload: false
        })
      })
  }
}

export function addRoom(payload) {
  return (dispatch) => {
    const {access_token} = payload
    dispatch({
      type:"SET_ROOM_LOADING",
      payload: true
    })
    axios({
      method:"post",
      url: "/rooms",
      headers: {
        access_token
      },
      data:{
        name: payload.name,
      }
    })
      .then(({data}) => {
        dispatch({
          type:"SET_ROOM_LOADING",
          payload: false
        })
        dispatch(fetchRooms(access_token))
      })
      .catch(err => {
        dispatch({
          type:"SET_ROOM_ERROR",
          payload: true
        })
        dispatch({
          type:"SET_ROOM_LOADING",
          payload: false
        })
      })
  }
}

export function fetchRooms(payload){
  return (dispatch) => {
    dispatch({
      type:"SET_ROOM_LOADING",
      payload: true
    })
    axios({
      method: 'GET',
      url: '/rooms',
      headers: {
        access_token: payload
      }
    })
      .then(({ data }) => {
        dispatch({
          type:"SET_ROOMS",
          payload: data
        })
        dispatch({
          type:"SET_ROOM_LOADING",
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type:"SET_ROOM_ERROR",
          payload: true
        })
        dispatch({
          type:"SET_ROOM_LOADING",
          payload: false
        })
      })
  }
}

export function fetchOneRoom(payload) {
  return (dispatch) => {
    const {id, access_token} = payload
    dispatch({
      type:"SET_LOADING_ROOM",
      payload: true
    })
    axios({
      method: 'GET',
      url: `/rooms/${id}`,
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({
          type:"SET_ROOM",
          payload: data
        })
        dispatch({
          type:"SET_LOADING_ROOM",
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type:"SET_ERROR_ROOM",
          payload: true
        })
        dispatch({
          type:"SET_LOADING_ROOM",
          payload: false
        })
      })
  }
}
