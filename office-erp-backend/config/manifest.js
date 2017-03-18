'use strict';

const Confidence = require('confidence');
const Config = require('./config.js');
const Meta = require('./meta');

let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
    server: {
        connections: {
            router: {
                stripTrailingSlash: true,
                isCaseSensitive: false,

            },
            routes: {
                security: false,
                cors: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }],
    registrations: [

        //Cookie authentication
        {
            plugin: 'hapi-auth-cookie'
        }, {
            plugin: 'hapi-auth-bearer-token'
        }, {
            plugin: 'hapi-auth-jwt2'
        },

        //Swagger documentation
        {
            plugin: './lib/swagger'

        },

        // Static file and directory handlers
        {
            plugin: 'inert'
        },

        // Templates rendering support 
        {
            plugin: 'vision'
        },

        // Views loader 
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: {
                        hbs: 'handlebars'
                    },
                    path: './app/templates',
                    layoutPath: './app/templates/layouts',
                    helpersPath: './app/templates/helpers',
                    partialsPath: './app/templates/partials',
                    layout: 'default'
                }
            }
        },

        //  MongoDB connector 
        {
            plugin: {
                register: './lib/mongoose',
                options: Config.get('/mongoose')
            }
        },

        // Flash Plugin
        {
            plugin: {
                register: './lib/flash'
            }
        },

        // Hapi cookie jar
        {
            plugin: {
                register: 'yar',
                options: Config.get('/yarCookie')
            }
        },

        //  Authentication strategy
        {
            plugin: {
                register: './lib/auth',
                options: Config.get('/authCookie')
            }
        },

        //  Authentication strategy
        {
            plugin: {
                register: './lib/newAuth',
                options: Config.get('/authCookie')
            }
        },

        //  App context decorator
        {
            plugin: {
                register: './lib/context',
                options: {
                    meta: Meta.get('/')
                }
            }
        },

        //  API(Organization) routes
        {
            plugin: './app/routes/api.js'
        },

        //  Employee routes
        {
            plugin: './app/routes/employee.js'
        },
        //  Login routes
        {
            plugin: './app/routes/login.js'
        },

        //  Core routes
        {
            plugin: './app/routes/core.js'
        },

        //  Pages routes
        {
            plugin: './app/routes/pages.js'
        },

        //  Auth routes
        {
            plugin: './app/routes/auth.js'
        }
    ]
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};
exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
