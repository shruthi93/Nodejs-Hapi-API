//This file contains all helper methods//
var mongoose = require('mongoose');
var confs = require('../../config/conf.json');
var queryConst = confs.queryParam;
var organizationId = "Simpragma";
var logger = require('../../logs').logger;
var organization = mongoose.model('Organization');
var orgDao = require('../dao/organization.js')
var Sync = require('sync');

module.exports = {
    createOrg: function(request, callback) {
        logger.trace("Inside createOrg BL: ", request)
        var org = new organization(request)
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgDao.createOrg.sync(null, org);
            logger.debug("The response from organization DAO : ", result);
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },
    getAllOrgs: function(callback) {
        logger.trace("Inside getAllOrgs BL")
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgDao.getAllOrg.sync(null);
            logger.debug("The response from get all organization DAO : ", result);
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },
    getOrgById: function(callback, orgId) {
        logger.trace("Inside getAllOrgs BL")
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgDao.getOrgById.sync(null, orgId);
            logger.debug("The response from get all organization DAO : ", result);
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },
    editOrg: function(request, newObject, callback) {
        logger.trace("Inside the editOrg BL");
        Sync(function() {
            var result = orgDao.editOrganization.sync(null, request, newObject);
            process.nextTick(function() {
                callback(null, result);
            })
        })
    },
    deleteOrg: function(request, callback) {
        logger.trace("Inside the deleteOrg BL");
        Sync(function() {
            var result = orgDao.deleteOrganization.sync(null, request);
            process.nextTick(function() {
                callback(null, result);
            })
        })
    }
}
