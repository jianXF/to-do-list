import {Service} from 'egg';
import {v1} from 'uuid';

export default class ListService extends Service {
    /**
     * 添加事件
     * @param {{content: string}} values
     * @returns {Promise<any>}
     */
    async add(values: {
        content: string;
    }) {
        const {content} = values;
        const now = new Date().getTime();
        return await this.ctx.model.List.create({
            create_time: now,
            uuid: v1(),
            content: content
        });
    }


    /**
     * 修改事件
     * @param {{uuid: string; content?: string; is_completed?: boolean; is_deleted?: boolean}} values
     * @returns {Promise<void>}
     */
    async update(values: {
        uuid: string;
        is_completed: string;
    }) {
        const {uuid, is_completed} = values;
        return await this.ctx.model.List.updateOne({uuid},
            {
                create_time: new Date().getTime(),
                is_completed
            });
    }

    /**
     * 删除事件
     * @param {Array<string> | string} uuid
     * @returns {Promise<void>}
     */
    async delete(uuid?: Array<string> | string) {
        return await this.ctx.model.List.updateMany(
            uuid ?
                {"uuid": {'$in': typeof uuid === 'string' ? [uuid] : uuid}} :
                {'is_completed': '1'},
            {'$set': {is_deleted: '1'}});
    }

    async find(values: {
        uuid?: string | Array<string>;
        is_completed?: string;
        content?: string;
    }) {
        const {uuid, is_completed, content} = values;
        let sql: any = {
            is_deleted: '0'
        };
        content && (sql.content = {'$regex': new RegExp(content, 'i')});
        is_completed && (sql.is_completed = is_completed);
        uuid && (sql.uuid = {'$in': typeof uuid === 'string' ? [uuid] : uuid});
        const data = await this.ctx.model.List.find(sql);
        return {
            data,
            total: data.length
        };
    }
}