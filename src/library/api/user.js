/**
 * Created by zkx on 2019/7/29.
 */
import axios from '#/utils/axios.js'

export function userLogin(data){
    return axios.post('/user/login', data);
}

export function getInfo(token){
    return axios.get('/user/info?token=' + token);
}