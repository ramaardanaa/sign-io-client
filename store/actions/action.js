import axios from '../../axios/axios'


export function login(payload) {
  return(dispatch) => {
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
    })
    .catch(err => {
      console.log(err);
    })
  }
}

// export function login(payload) {
//   console.log(payload)
//   return(dispatch) => {
//     axios({
//       method:"post",
//       url: "/users/login",
//       data:{
//         email: payload.email,
//         password: payload.password
//       }
//     })
//     .then(({data}) => {
//       console.log(data)
//       dispatch({
//         type:"SET_TOKEN",
//         payload: data.access_token
//       })
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }
// }