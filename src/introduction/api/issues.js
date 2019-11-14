/**
 * Created by zkx on 2019/7/30.
 */
import axios from '#/utils/axios.js'

//获取问题列表
export function fetchList(projectCode){
    return axios.get('/issues/list?projectCode=' + projectCode);
}

//获取问题信息
export function fetchIssue(id){
    return axios.get('/issues/detail?id=' + id);
}

//获取问题内容
export function fatchContent(id){
    return axios.get('/issues/content?id=' + id);
}