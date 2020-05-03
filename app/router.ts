import { Application } from 'egg';
import view from './router/view';

export default (app: Application) => {
    // view模块路由
    view(app);
};
