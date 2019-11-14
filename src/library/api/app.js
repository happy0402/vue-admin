/**
 * Created by zkx on 2019/7/29.
 */
import axios from '#/utils/axios.js'

export function fetchList() {
    return axios.get('/app/list');
}

export function getInfo(appCode) {
    return axios.get('/app/info?appCode=' + appCode);
}