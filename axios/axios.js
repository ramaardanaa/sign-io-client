import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://180.248.17.122:3000'
})

export default instance
