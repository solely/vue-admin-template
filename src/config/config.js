import Env from './env';

let config = {
    env: Env,
    debug:{
        baseUrl:'http://debug.xxx.com',
    },
    production:{
        baseUrl:'http://api.xxx.com',
    },
    dev:{
        baseUrl:'http://test.xxx.com',
    }
};
export default config;