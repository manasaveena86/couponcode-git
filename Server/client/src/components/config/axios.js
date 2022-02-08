import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:5000'
})

//http://localhost:5000
//http://52.66.70.16:5000
//https://doc-connect-20.herokuapp.com
export default axios