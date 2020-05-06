import BaseController from '../core/base_controller';

export default class ListController extends BaseController {
    /**
     * 添加事件
     * @returns {Promise<void>}
     */
    @BaseController.stdOutput
    async add() {
        const {content} = this.ctx.request.body;
        await this.ctx.service.list.add({content});
    }

    /**
     * 添加事件
     * @returns {Promise<void>}
     */
    @BaseController.stdOutput
    async update() {
        await this.ctx.service.list.update(this.ctx.request.body);
    }

    /**
     * 删除事件
     * @returns {Promise<void>}
     */
    @BaseController.stdOutput
    async del() {
        const {uuid} = this.ctx.request.body;
        await this.ctx.service.list.delete(uuid);
    }

    /**
     * 查询事件
     * @returns {Promise<void>}
     */
    @BaseController.stdOutput
    async find() {
        const {uuid, is_completed, content} = this.ctx.request.query;
        const {data, total} = await this.ctx.service.list.find({uuid, is_completed, content});
        this.ctx.body = {
            data,
            total
        };
    }
}