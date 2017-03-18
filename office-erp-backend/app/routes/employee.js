'use strict';
var servConstants = require('../../config/conf.json').constants
var logger = require('../../logs').logger;
logger.info("Inside employee Routes")
exports.register = function(plugin, options, next) {

    const Controllers = {
        employee: require('../controllers/api/employee')
    };
    plugin.route([

        // employee Routes
        {
            method: 'POST',
            path: '/api/' + servConstants.version + '/employees',
            config: Controllers.employee.addEmployee
        }, {
            method: 'GET',
            path: '/api/' + servConstants.version + '/employees',
            config: Controllers.employee.getEmployee
        }, {
            method: 'GET',
            path: '/api/' + servConstants.version + '/employees/{empId}',
            config: Controllers.employee.findEmployeeById
        }, {
            method: 'PUT',
            path: '/api/' + servConstants.version + '/employees/{empId}',
            config: Controllers.employee.editEmployee
        }, {
            method: 'DELETE',
            path: '/api/' + servConstants.version + '/employees/{empId}',
            config: Controllers.employee.deleteEmployee
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'employee_routes',
    version: require('../../package.json').version
};
