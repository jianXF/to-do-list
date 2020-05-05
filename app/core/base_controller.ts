import {Controller, Context} from 'egg';

export default class BaseController extends Controller {
    /**
     * 标准化输出返回
     * @author jane.kan
     */
    protected static stdOutput = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const func = descriptor.value;
        descriptor.value = async function (ctx: Context) {
            await func.bind(this)(ctx);
            this.ctx.body = {
                code: 0,
                data: this.ctx.body
            };
            this.ctx.response.status = 200;
        };
        return descriptor;
    };
}
