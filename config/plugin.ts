import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    static: true,

    // MongoDB
    mongoose: {
        enable: true,
        package: 'egg-mongoose'
    },
    // View Engine
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    }
};

export default plugin;