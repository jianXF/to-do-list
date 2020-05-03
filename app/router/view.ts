import { Application } from 'egg';

/**
 * 模块说明
 * -------
 * 职能：页面渲染
 * 提示：由于通配规则的存在，该部分必须置于其他路由之后
 */

export default (app: Application) => {
    const { router, controller } = app;
    console.log(app.config,'2734982793');
    router.get('*', controller.view.index);
};
