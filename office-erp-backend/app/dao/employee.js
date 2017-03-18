var mongoose = require('mongoose');
var logger = require('../../logs').logger;
var helper = require('../helpers/helper.js');
var servConstants = require('../../config/conf.json').constants;
var qrConstants = require('../../config/conf.json').queryParam;
var employeeDB = mongoose.model('Employee');

logger.trace("Inside the employee DAO layer")

var responseObj = {
    statusCode: '',
    message: '',
    description: '',
    data: '',
    err: ''
}

module.exports = {

    addEmployee: function(request, callback) {
        logger.trace("Inside the addEmployee DAO")
        logger.debug("Saving employee details to DB : ", request)

        request.save(function(err, res) {
            if (err) {
                logger.error(servConstants.description.addEmpErr, " : ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.description = servConstants.description.addEmpValidation;
                responseObj.data = null
                responseObj.err = err
            } else {
                logger.info(servConstants.description.empCreated);
                logger.trace("RESPONSE: ", request);
                responseObj.statusCode = servConstants.statusSuccess;
                responseObj.message = servConstants.machineCode.empCreated;
                responseObj.description = servConstants.description.empCreated;
                responseObj.data = res;
                responseObj.err = null;
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        });
    },

    getEmployee: function(callback) {
        logger.trace("Inside the getEmployee DAO")

        employeeDB.find(function(err, listOfEmployee) {
            if (err) {
                logger.error(servConstants.description.servErr, " : ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.data = null
                responseObj.err = err
            } else if (listOfEmployee.length == 0) {
                logger.warn(servConstants.description.empNotFound);
                responseObj.statusCode = servConstants.statusNotFound;
                responseObj.message = servConstants.machineCode.empNotFound;
                responseObj.description = servConstants.description.empNotFound;
                responseObj.data = listOfEmployee;
                responseObj.err = err;
            } else {
                logger.info(servConstants.empFound);
                responseObj.statusCode = servConstants.statusSuccess;
                responseObj.message = servConstants.machineCode.empFound;
                responseObj.description = servConstants.description.empFound;
                responseObj.data = listOfEmployee;
                responseObj.err = null;
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        });
    },

    findEmployeeById: function(empId, callback) {
        logger.trace("Inside the findEmployeeById DAO")

        employeeDB.findOne({ empId }, function(err, employeeData) {
            if (err) {
                logger.error(servConstants.description.servErr, ": ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.data = null
                responseObj.err = err
            } else if (employeeData == null) {
                logger.warn(servConstants.description.empNotFound);
                responseObj.statusCode = servConstants.statusNotFound;
                responseObj.message = servConstants.machineCode.empNotFound;
                responseObj.description = servConstants.description.empNotFound;
                responseObj.data = employeeData;
                responseObj.err = null;
            } else {
                logger.info(servConstants.description.FindEmpRecord);
                responseObj.statusCode = servConstants.statusSuccess;
                responseObj.message = servConstants.machineCode.FindEmpRecord;
                responseObj.description = servConstants.description.FindEmpRecord;
                responseObj.data = employeeData;
                responseObj.err = null;
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        });
    },

    editEmployee: function(empId, newObject, callback) {
        logger.trace("Inside the editEmployee DAO")

        employeeDB.findOne({ empId }, function(err, employeeData) {
            if (err) {
                logger.error(servConstants.description.servErr, ": ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.data = null
                responseObj.err = err
            } else if (employeeData == null) {
                logger.warn(servConstants.description.empNotFound);
                responseObj.statusCode = servConstants.statusNotFound;
                responseObj.message = servConstants.machineCode.empNotFound;
                responseObj.description = servConstants.description.empNotFound;
                responseObj.data = employeeData;
                responseObj.err = null;
            } else {
                var result = helper.updateEmployee(employeeData, newObject);
                logger.info("New emp obj :", result);
                result.save(function(err, res) {
                    if (err) {
                        logger.error(servConstants.description.servErr, " : ", err);
                        responseObj.statusCode = servConstants.statusFailure;
                        responseObj.message = servConstants.machineCode.servErr;
                        responseObj.data = null
                        responseObj.err = err
                    } else {
                        logger.info(servConstants.description.empUpdated, " : ", employeeData);
                        logger.trace(servConstants.description.empUpdated);
                        responseObj.statusCode = servConstants.statusSuccess;
                        responseObj.message = servConstants.machineCode.empUpdated;
                        responseObj.description = servConstants.description.empUpdated;
                        responseObj.data = res;
                        responseObj.err = null;
                    }
                });
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        })
    },

    deleteEmployee: function(empId, callback) {
        logger.trace("Inside the delete DAO")

        employeeDB.findOne({ empId }, function(err, employeeData) {
            if (err) {
                logger.error(servConstants.description.servErr, ": ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.data = null
                responseObj.err = err
            } else if (employeeData == null) {
                logger.warn(servConstants.description.empNotFound);
                responseObj.statusCode = servConstants.statusNotFound;
                responseObj.message = servConstants.machineCode.empNotFound;
                responseObj.description = servConstants.description.empNotFound;
                responseObj.data = employeeData;
                responseObj.err = null;
            } else {
                employeeData.remove(function(err, res) {
                    if (err) {
                        logger.error(servConstants.description.servErr, " : ", err);
                        responseObj.statusCode = servConstants.statusFailure;
                        responseObj.message = servConstants.machineCode.servErr;
                        responseObj.data = null
                        responseObj.err = err
                    } else {
                        logger.info(servConstants.description.empDeleted);
                        logger.trace(servConstants.description.empDeleted);
                        responseObj.statusCode = servConstants.statusSuccess;
                        responseObj.message = servConstants.machineCode.empDeleted;
                        responseObj.description = servConstants.description.empDeleted;
                        responseObj.data = res;
                        responseObj.err = null;
                    }
                });
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        })
    }
}
