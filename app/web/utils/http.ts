import 'whatwg-fetch';

// ExpError类
export class ExpError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

/**
 * Fetch封装
 */

export class Http {
    prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix || '';
    }

    /**
     * trim qs/body
     */
    trim = (value: { [key: string]: any }) =>{
        const a =Object.entries(value || {})
        return a.reduce((s, [k, v]) => ({
            ...s,
            ...(['number', 'boolean'].includes(typeof v) || v === '' || v) && {[k]: v}
        }), {});
    }


    /**
     * cookie getter
     */
    getCookie(): any {
        return document.cookie.split('; ').reduce((r, s) => {
            const [k, v] = s.split('=');
            return {...r, [k]: v};
        }, {});
    }

    /**
     * 添加CsrfToken
     */
    addCsrfToken(init: { [key: string]: any }) {
        const headers = Object.assign({}, init.headers);
        try {
            headers['x-csrf-token'] = this.getCookie()['csrfToken'];
        } catch (e) {
            //
        }
        init.headers = headers;
        return init;
    }

    /**
     * GET请求方法
     */
    get = (uri: string, query: { [key: string]: any } = {}) => {
        const qs = Object.entries(this.trim(query)).map(([k, v]) => `${k}=${v}`).join('&');
        return this.fetch(`/${this.prefix}${uri}${qs ? `?${qs}` : ''}`, this.addCsrfToken({}));
    };

    /**
     * POST请求方法
     */
    post = (uri: string, data: { [key: string]: any } = {}) => {
        console.log(data, uri, '1');
        return this.fetch(`/${this.prefix}${uri}`, this.addCsrfToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.trim(data))
        }));
    };

    /**
     * 请求方法
     */
    fetch = async (uri: string, init: { [key: string]: any } = {}) => {
        const respone = await fetch(encodeURI(uri), {
            ...init,
            credentials: 'same-origin'
        }).then(res => {
            if (!res.ok) return {code: res.status};
            else return res.json();
        });
        return this.inspection(respone);
    };

    /**
     * 结果处理
     */
    inspection = ({code, data}: { code: number, data: { [key: string]: any } }) => {
        if (code === 0) {
            return data;
        } else {
            throw new ExpError('Request Error', code);
        }
    }
}

export default new Http('v1');
