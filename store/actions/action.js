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
        console.log(data)
        dispatch({
          type:"SET_TOKEN",
          payload: data.access_token
        })
        dispatch({
          type:"SET_NAME",
          payload: data.name
        })
        dispatch({
          type: "SET_PICTURE",
          payload: data.profile_picture
        })
        dispatch({
          type: "SET_UNIQUE_CODE",
          payload: data.unique_code
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
          type: "SET_CHATS",
          payload: data.chats
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

export function register(payload) {
  return(dispatch) => {
    dispatch({
      type:"SET_USER_LOADING",
      payload: true
    })
    axios({
      method:"post",
      url: "/users/register",
      data:{
        name: payload.name,
        email: payload.email,
        password: payload.password
      }
    })
    .then(({data}) => {
      console.log(data)
      dispatch({
        type:"SET_USER_LOADING",
        payload: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function addMessage(payload) {
  return(dispatch) => {
    dispatch({
      type:"SET_CHAT_SEND_LOADING",
      payload: true
    })
    const {access_token, message, RoomId} = payload
    axios({
      method:"post",
      url: "/chats",
      headers: {
        access_token
      },
      data:{
        message,
        RoomId
      }
    })
    .then(({data}) => {
      dispatch({
        type:"SET_CHAT_SEND_LOADING",
        payload: false
      })
    })
    .catch(err => {
      dispatch({
        type:"SET_CHAT_SEND_ERROR",
        payload: true
      })
      dispatch({
        type:"SET_CHAT_SEND_LOADING",
        payload: false
      })
    })
  }
}

export function updateUser(payload) {
  return (dispatch) => {
    const {access_token, name, profile_picture} = payload
    dispatch({
      type:"SET_USER_LOADING",
      payload: true
    })
    axios({
      method:"put",
      url: `/users/edit`,
      headers: {
        access_token
      },
      data:{
        name,
        profile_picture
      }
    })
      .then(({data}) => {
        dispatch({
          type:"SET_NAME",
          payload: data.name
        })
        dispatch({
          type: "SET_PICTURE",
          payload: data.profile_picture
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

export function fetchFriends(payload) {
  return (dispatch) => {
    dispatch({
      type:"SET_LOADING_FRIEND",
      payload: true
    })
    axios({
      method:"GET",
      url: `/friends`,
      headers: {
        access_token: payload
      }
    })
      .then(({data}) => {
        console.log(data)
        dispatch({
          type:"SET_FRIENDS",
          payload: data
        })
        dispatch({
          type:"SET_LOADING_FRIEND",
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type:"SET_ERROR_FRIEND",
          payload: true
        })
        dispatch({
          type:"SET_LOADING_FRIEND",
          payload: false
        })
      })
  }
}

export function addFriend(payload) {
  return (dispatch) => {
    const {access_token, unique_code} = payload
    dispatch({
      type:"SET_LOADING_FRIEND",
      payload: true
    })
    axios({
      method:"POST",
      url: `/friends`,
      headers: {
        access_token
      },
      data: {
        unique_code
      }
    })
      .then(({data}) => {
        dispatch({
          type:"SET_LOADING_FRIEND",
          payload: false
        })
        dispatch(fetchFriends(access_token))
      })
      .catch(err => {
        dispatch({
          type:"SET_ERROR_FRIEND",
          payload: true
        })
        dispatch({
          type:"SET_LOADING_FRIEND",
          payload: false
        })
      })
  }
}

export function joinRoom (payload) {
  return (dispatch) => {
    console.log(payload)
    const {access_token, code} = payload
    dispatch({
      type:"SET_ROOM_LOADING",
      payload: true
    })
    axios({
      method: 'POST',
      url: '/members',
      headers: {
        access_token
      },
      data: {
        code
      }
    })
      .then(({ data }) => {
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