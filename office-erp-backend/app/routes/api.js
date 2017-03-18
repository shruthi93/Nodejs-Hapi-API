'use strict';
var servConstants = require('../../config/conf.json').constants
var logger = require('../../logs').logger;
logger.info("Inside API Routes")
exports.register = function(plugin, options, next) {

    const Controllers = {
        org: require('../controllers/api/organization')
    };
    plugin.route([

        // api Routes
        {
            method: 'POST',
            path: '/api/' + servConstants.version + '/organizations',
            config: Controllers.org.addOrganization
        },
        {
            method: 'GET',
            path: '/api/' + servConstants.version + '/organizations',
            config: Controllers.org.getOrganization
        },
         {
            method: 'GET',
            path: '/api/' + servConstants.version + '/organizations/{orgId}',
            config: Controllers.org.getOrganizationById
        },
         {
            method: 'PUT',
            path: '/api/' + servConstants.version + '/organizations/{orgId}',
            config: Controllers.org.editOrganization
        },
         {
            method: 'DELETE',
            path: '/api/' + servConstants.version + '/organizations/{orgId}',
            config: Controllers.org.deleteOrganization
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api_routes',
    version: require('../../package.json').version
};
