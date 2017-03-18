var mongoose = require('mongoose');
var employee = mongoose.model('Employee');
var logger = require('../../logs').logger;
var employeeDao = require('../dao/employee.js');
var servConstants = require('../../config/conf.json').constants;
var Sync = require('sync');

module.exports = {

    createEmployee: function(request, callback) {
        logger.trace("Inside the createEmployee BL", request);
       
        Sync(function() {
             var employeeRecord = new employee(request);
            var result = employeeDao.addEmployee.sync(null, employeeRecord);
            logger.debug("The response from add employee DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },

    getEmployee: function(callback) {
        logger.trace("Inside the getEmployee BL");
        Sync(function() {
            var result = employeeDao.getEmployee.sync(null);
            logger.debug("The response from get employee DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },

    findEmployeeById: function(request, callback) {
        logger.trace("Inside the findEmployeeById BL : ", request);
        Sync(function() {
            var result = employeeDao.findEmployeeById.sync(null, request);
            logger.debug("The response from get employee by Id DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },

    editEmployee: function(request, newObject, callback) {
        logger.trace("Inside the editEmployee BL : ", request);
        Sync(function() {
            var result = employeeDao.editEmployee.sync(null, request, newObject);
            logger.debug("The response from edit employee DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },

    deleteEmployee: function(request, callback) {
        logger.trace("Inside the deleteEmployee BL : ", request);
        Sync(function() {
            var result = employeeDao.deleteEmployee.sync(null, request);
            logger.debug("The response from delete employee DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    }
}
