//This file contains all helper methods//
var mongoose = require('mongoose');
var confs = require('../../config/conf.json');
var queryConst = confs.queryParam;
var organizationId = "Simpragma";
var logger = require('../../logs').logger;
var organization = mongoose.model('Organization');
var servConstants = require('../../config/conf.json').constants;
var organization = mongoose.model('Organization');
var helper = require('../helpers/helper.js');

var respObj = {
    "status": "",
    "msg": "",
    "description": "",
    "err": "",
    "data": ""
};

module.exports = {
    createOrg: function(request, callback) {
        logger.debug("Saving organization details to DB : ", request)
        request.save(function(err, res) {
            if (err) {
                logger.error(servConstants.description.addOrgErr, " : ", err);
                respObj.status = 0;
                respObj.msg = servConstants.machine_code.addOrgErr;
                respObj.err = err
                respObj.data = null
                process.nextTick(function() {
                    callback(null, respObj);
                })
            } else {
                logger.info(servConstants.description.orgCreated);
                logger.trace("RESPONSES : ", request);
                respObj.status = 1;
                respObj.msg = servConstants.machine_code.orgCreated;
                respObj.data = res
                respObj.err = null
                process.nextTick(function() {
                    callback(null, respObj);
                })
            }
        });
    },
    getAllOrg: function(callback) {
        logger.debug("Retriving organization records from DB")
        organization.find(function(err, getOrg) {
            if (err) {
                logger.error(servConstants.servErr, ": ", err);
                respObj.status = servConstants.status_failure;
                respObj.msg = servConstants.machine_code.servErr;
                respObj.err = err
                respObj.data = null
            } else if (getOrg.length == 0) {
                logger.warn(servConstants.description.orgNotFound);
                respObj.status = servConstants.status_not_found;
                respObj.msg = servConstants.machine_code.orgNotFound;
                respObj.err = err
                respObj.data = getOrg
                    //helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.orgFound);
                respObj.status = servConstants.status_success;
                respObj.msg = servConstants.machine_code.orgFound;
                respObj.err = null
                respObj.data = getOrg
                    //helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgFound, servConstants.description.orgFound, getOrg, reply);
            }
            process.nextTick(function() {
                callback(null, respObj);
            })
        });
    },
    getOrgById: function(callback, orgId) {
        logger.debug("Retriving organization records from DB")
        organization.find(function(err, getOrg) {
            if (err) {
                logger.error(servConstants.servErr, ": ", err);
                respObj.status = servConstants.status_failure;
                respObj.msg = servConstants.machine_code.servErr;
                respObj.err = err
                respObj.data = null
            } else if (getOrg.length == 0) {
                logger.warn(servConstants.description.orgNotFound);
                respObj.status = servConstants.status_not_found;
                respObj.msg = servConstants.machine_code.orgNotFound;
                respObj.err = err
                respObj.data = getOrg
                    //helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.orgFound);
                respObj.status = servConstants.status_success;
                respObj.msg = servConstants.machine_code.orgFound;
                respObj.err = null
                respObj.data = getOrg
                    //helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgFound, servConstants.description.orgFound, getOrg, reply);
            }
            process.nextTick(function() {
                callback(null, respObj);
            })
        });
    },
    editOrganization: function(orgId, newObject, callback) {
        logger.trace("Inside the editOrganization DAO")
        organization.findOne({ orgId }, function(err, orgData) {
            if (err) {
                logger.error(servConstants.description.servErr, ": ", err);
                respObj.statusCode = servConstants.status_failure;
                respObj.message = servConstants.machine_code.servErr;
                respObj.data = null
                respObj.err = err
            } else if (orgData == null) {
                logger.warn(servConstants.description.orgNotFound);
                respObj.statusCode = servConstants.status_not_found;
                respObj.message = servConstants.machine_code.orgNotFound;
                respObj.description = servConstants.description.orgNotFound;
                respObj.data = orgData;
                respObj.err = null;
            } else {
                var result = helper.updateOrg(newObject, orgData);
                logger.info("New org obj :", orgData);
                result.save(function(err, res) {
                    if (err) {
                        logger.error(servConstants.description.servErr, " : ", err);
                        respObj.statusCode = servConstants.status_failure;
                        respObj.message = servConstants.machine_code.servErr;
                        respObj.data = null
                        respObj.err = err
                    } else {
                        logger.info(servConstants.description.orgUpdated, " : ", orgData);
                        logger.trace(servConstants.description.orgUpdated);
                        respObj.statusCode = servConstants.status_success;
                        respObj.message = servConstants.machine_code.orgUpdated;
                        respObj.description = servConstants.description.orgUpdated;
                        respObj.data = res;
                        respObj.err = null;
                    }
                });
            }
            process.nextTick(function() {
                callback(null, respObj);
            })
        })
    },
    deleteOrganization: function(orgId, callback) {
        logger.trace("Inside the deleteOrganization DAO")

        organization.findOne({ orgId }, function(err, orgData) {
            if (err) {
                logger.error(servConstants.description.servErr, ": ", err);
                respObj.statusCode = servConstants.status_failure;
                respObj.message = servConstants.machine_code.servErr;
                respObj.data = null
                respObj.err = err
            } else if (orgData == null) {
                logger.warn(servConstants.description.orgNotFound);
                respObj.statusCode = servConstants.status_not_found;
                respObj.message = servConstants.machine_code.orgNotFound;
                respObj.description = servConstants.description.orgNotFound;
                respObj.data = orgData;
                respObj.err = null;
            } else {
                orgData.remove(function(err, res) {
                    if (err) {
                        logger.error(servConstants.description.servErr, " : ", err);
                        respObj.statusCode = servConstants.status_failure;
                        respObj.message = servConstants.machine_code.servErr;
                        respObj.data = null
                        respObj.err = err
                    } else {
                        logger.info(servConstants.description.orgDeleted);
                        logger.trace(servConstants.description.orgDeleted);
                        respObj.statusCode = servConstants.status_success;
                        respObj.message = servConstants.machine_code.orgDeleted;
                        respObj.description = servConstants.description.orgDeleted;
                        respObj.data = res;
                        respObj.err = null;
                    }
                });
            }
            process.nextTick(function() {
                callback(null, respObj);
            })
        })
    }
}
