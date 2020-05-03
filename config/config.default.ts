import { EggAppConfig, PowerPartial } from 'egg';

export interface Config {
    name: string;

}

export default () => {
    const config = {} as PowerPartial<EggAppConfig> & Config;

    // 应用名称
    config.name = '456dfgdfg';

    // Cookie配置
    config.keys = 'HCIwKDTAYLoc4li8BFm4Hs7V';

    // Session配置
    // config.session = {
    //     key: 'SID',
    //     maxAge: 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //     encrypt: true
    // };


    // // 请求体限制
    // config.bodyParser = {
    //     jsonLimit: '5mb',
    //     formLimit: '6mb',
    // };


    // 视图引擎配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
            '.html': 'nunjucks'
        }
    };

    return config;
};
