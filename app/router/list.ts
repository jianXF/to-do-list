import {Application} from 'egg';

/**
 * mongodb
 * @param {module:egg.Application} app
 * @param {(value?: string) => string} Uri
 */

export default (app: Application, Uri: (value?: string) => string) => {
    const {router, controller} = app;
    // 添加事件
    router.post(Uri('/add'), controller.list.add);
    // 修改事件
    router.post(Uri('/update'), controller.list.update);
    // 删除事件
    router.post(Uri('/del'), controller.list.del);
    // 查找事件
    router.get(Uri('/find'), controller.list.find);

};