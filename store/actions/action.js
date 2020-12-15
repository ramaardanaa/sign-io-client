import axios from '../../axios/axios'


export function login(payload) {
  return(dispatch) => {
    console.log(payload)
    axios({
      method:"post",
      url: "http://180.248.17.122:3000/users/login",
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
