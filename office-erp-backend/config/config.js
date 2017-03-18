 'use strict';

const Confidence = require('confidence');
var logger = require('../logs');
var mylogs = logger.logger;
// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

//  Confidence document object

internals.config = {
    $meta: 'App configuration file',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://example.com',
        $default: 'http://127.0.0.1:8000'
    },
    logger: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production:logger.setLevelProd(),
        dev: logger.setLevelDev()
    },
    mongoose: {
        $filter: 'env',
        production: {
            uri: 'mongodb://localhost/simbot'
        },
        test: {
            uri: 'mongodb://localhost/simbot'
        },
        $default: {
            uri: 'mongodb://localhost/simbot',
            options: {}
        }
    },
    authCookie: {
        cookieSecret: 'MyCookieSecret_ThisShould_be_32_character_long',
        cookieName: 'Basic-auth'
    },
    yarCookie: {
        storeBlank: false,
        cookieOptions: {
            password: 'MyYarCookieSecret_ThisShould_be_32_character_long',
            isSecure: false
        }
    }
};

internals.store = new Confidence.Store(internals.config);
//internals.store.get('logger',internals.criteria)
//mylogs.debug("Curr Env : ",internals.criteria.env)
exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
