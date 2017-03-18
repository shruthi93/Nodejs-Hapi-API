'use strict';
var servConstants = require('../../config/conf.json').constants
var logger = require('../../logs').logger;
logger.info("Inside login Routes")
exports.register = function(plugin, options, next) {

    const Controllers = {
        loginCtrl: require('../controllers/api/login')
    };
    plugin.route([

        // employee Routes
        {
            method: 'POST',
            path: '/api/' + servConstants.version + '/login',
            config: Controllers.loginCtrl.login
        }

    ]);

    next();
};

exports.register.attributes = {
    name: 'login_routes',
    version: require('../../package.json').version
};
