import {Application} from 'egg';
import view from './router/view';
import list from './router/list';

const Uri = (module: string) => (value: string = '') => `/v1/${module}${value}`
export default (app: Application) => {

    list(app, Uri('list'));
    // view模块路由
    view(app);
};
