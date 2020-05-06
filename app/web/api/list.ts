import Request from '../utils/http';

export default class ListApi {
    // 添加事件
    add = (values: {
        content: string;
    }) => Request.post('/list/add', values);
    // 修改事件
    update = (values: {
        uuid: string;
        is_completed: string;
    }) => Request.post('/list/update', values);
    // 删除事件
    del = (values: {
        uuid: string;
    }) => Request.post('/list/del', values);
    // 查找事件
    find = (values: {
        is_completed: string;
    }) => Request.get('/list/find', values);
}

