'use strict';
const swaggered = require('hapi-swaggered');
const swaggeredUI = require('hapi-swaggered-ui');
const vision = require('vision');
const inert = require('inert');


// console.log("INSIDE THE SWAGGER LIB FOLDER")
exports.register = function(server, options, next) {
    server.register([
        inert,
        vision, {
            register: swaggered,
            options: {
                info: {
                    title: 'Simbot API',
                    description: 'API documentation for my Simbot API',
                    version: '1.0',
                },
            },
        }, {
            register: swaggeredUI,
            options: {
                title: 'Simbot API',
                path: '/docs',
                swaggerOptions: {
                    validatorUrl: null,
                },
            },
        }
    ], (err) => {
        if (err) {
            throw err;
        }
    });

    next();
}
exports.register.attributes = {
    name: 'swagger',
    dependencies: ['vision', 'inert', 'hapi-swaggered']
};
