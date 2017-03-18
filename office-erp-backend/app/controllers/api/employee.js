var mongoose = require('mongoose');
var helper = require('../../helpers/helper.js');
var servConstants = require('../../../config/conf.json').constants;
var qrConstants = require('../../../config/conf.json').queryParam;
var logger = require('../../../logs').logger;
var employeeLogic = require('../../business-logic/employee.js');
var Sync = require('sync');
var Joi = require('joi');

exports.addEmployee = {
    description: 'Create Employee',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        },
        payload: Joi.object()
    },
    handler: function(request, reply) {

        logger.trace("Inside the addEmployee API")
        logger.debug("Add the employee : ", request.payload);
        Sync(function() {
            var result = employeeLogic.createEmployee.sync(null, request.payload)
            logger.debug("The response from add employee BL : ", result);
            if (result.statusCode == servConstants.statusSuccess) {
                logger.info(servConstants.description.empCreated + " With ID :" + result.data.empId);
                helper.statusGenerator(servConstants.statusSuccess, servConstants.machineCode.empCreated, servConstants.description.empCreated, null, reply);
            } else {
                logger.error(servConstants.description.addEmpErr, " : ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            }
            logger.trace("Exiting the addEmployee API");
        })
    }
};

exports.getEmployee = {
    description: 'List of employee',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        }
    },
    handler: function(request, reply) {

        logger.trace("Inside the getEmployee API");
        logger.debug("Get the employee ");
        Sync(function() {
            var result = employeeLogic.getEmployee.sync(null)
            logger.debug("The response from get employee BL : ", result);
            if (result.statusCode == servConstants.statusFailure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            } else if (result.statusCode == servConstants.statusNotFound) {
                logger.warn(servConstants.description.empNotFound);
                helper.statusGenerator(null, null, null, result.data, reply);
            } else {
                logger.info(servConstants.empFound + " : " + result.data);
                helper.statusGenerator(null, null, null, result.data, reply);
            }
            logger.trace("Exiting the getEmployee API");
        })
    }
};

exports.findEmployeeById = {
    description: 'Find employee by Id',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        },
        params: {
            empId: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        logger.trace("Inside the findEmployeeById API");
        logger.debug("Get the employee by Id : ", request.params.empId);
        Sync(function() {
            var result = employeeLogic.findEmployeeById.sync(null, request.params.empId)
            logger.debug("The response from get employee by Id BL : ", result);
            if (result.statusCode == servConstants.statusFailure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            } else if (result.statusCode == servConstants.statusNotFound) {
                logger.warn(servConstants.description.empNotFound);
                helper.statusGenerator(null, null, null, result.data, reply);
            } else {
                logger.info("The user is : ", result.data);
                helper.statusGenerator(null, null, null, result.data, reply);
            }
            logger.trace("Exiting the findEmployeeById API");
        })
    }
};

exports.editEmployee = {
    description: 'Update employee',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        },
        params: {
            empId: Joi.string().required()
        },
        payload: Joi.object()
    },
    handler: function(request, reply) {

        logger.trace("Inside the editEmployeeDetails API");
        logger.debug("Modifyng employee details for : ", request.params.empId);
        Sync(function() {
            var result = employeeLogic.editEmployee.sync(null, request.params.empId, request.payload)
            logger.debug("The response from edit employee BL : ", result);
            if (result.statusCode == servConstants.statusFailure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            } else if (result.statusCode == servConstants.statusNotFound) {
                logger.warn(servConstants.description.empNotFound);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.empNotFound, servConstants.description.empNotFound, null, reply);
            } else {
                logger.info(servConstants.description.empUpdated, " :", result.data);
                helper.statusGenerator(servConstants.statusSuccess, servConstants.machineCode.empUpdated, servConstants.description.empUpdated, null, reply);
            }
            logger.trace("Exiting the editEmployee API");
        })
    }
};
exports.deleteEmployee = {
    description: 'Delete employee',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        },
        params: {
            empId: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        logger.trace("Inside the deleteEmployeeDetails API");
        logger.debug("Deleting employee details is : ", request.params.empId);
        Sync(function() {
            var result = employeeLogic.deleteEmployee.sync(null, request.params.empId)
            logger.debug("The response from delete employee BL : ", result);
            if (result.statusCode == servConstants.statusFailure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            } else if (result.statusCode == servConstants.statusNotFound) {
                logger.warn(servConstants.description.empNotFound);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.empNotFound, servConstants.description.empNotFound, null, reply);
            } else {
                logger.info(servConstants.description.empDeleted + " With ID :" + request.params.empId);
                helper.statusGenerator(servConstants.statusSuccess, servConstants.machineCode.empDeleted, servConstants.description.empDeleted, null, reply);
            }
            logger.trace("Exiting the deleteEmployee API");
        })
    }
};
