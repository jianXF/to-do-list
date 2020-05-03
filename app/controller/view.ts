import { Controller } from 'egg';



export default class ViewController extends Controller {
    /**
     * 首页
     */
    async index() {
        await this.ctx.render('index.html',{title:'ToDo-list'});
    }
}
