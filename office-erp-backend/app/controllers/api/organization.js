'use strict';
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
var helper = require('../../helpers/helper.js');
var servConstants = require('../../../config/conf.json').constants;
var qrConstants = require('../../../config/conf.json').queryParam;
var confApiKey = require('../../../config/conf.json').apiKey;
var logger = require('../../../logs').logger;
var orgLogic = require('../../business-logic/organization.js');
var Sync = require('sync');
var Joi = require('joi');

exports.addOrganization = {
    description: 'Create Organization',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string().required()
        },
        payload: Joi.object({
            orgId: Joi.string(),
            orgName: Joi.string(),
            orgUrl: Joi.string(),
            orgEmail: Joi.string(),
            creationDate: Joi.date()
        })
    },
    handler: function(request, reply) {
        logger.trace("Inside the addOrganization API");
        logger.debug("Add the organization : ", request.payload);
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgLogic.createOrg.sync(null, request.payload);
            console.log("The response from add organization BL : ", result);
            if (result.statusCode == 1) {
                logger.info(servConstants.description.orgCreated + " with id : " + result.data.orgId);
                helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgCreated, servConstants.description.orgCreated, null, reply);
            } else {
                logger.error(servConstants.description.addEmpErr, " : ", result.err);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.servErr, servConstants.description.addOrgErr, null, reply);
            }
            logger.trace("Exiting the addOrganization API");
        })
    }
};

exports.getOrganization = {
    description: 'List of Organization',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        logger.trace("Inside the getOrganization API", request.query);
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgLogic.getAllOrgs.sync(null);
            console.log("The response from get all organization BL : ", result);
            if (result.statusCode == servConstants.status_failure) {
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.servErr, null, reply);
            } else if (result.statusCode == servConstants.status_not_found) {
                logger.warn(servConstants.description.orgNotFound);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.description.orgFound);
                helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgFound, servConstants.description.orgFound, result.data, reply);
            }
            logger.trace("Exiting the getOrganization API");
        })
    }
};

exports.getOrganizationById = {
    description: 'Find organization by Id',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string().required(),
        },
        params: {
            orgId: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        logger.trace("Inside the getOrganizationById API");
        Sync(function() {
            // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
            var result = orgLogic.getOrgById.sync(null, request.params.orgId);
            console.log("The response from get organization by Id BL: ", result);
            if (result.statusCode == servConstants.status_failure) {
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.servErr, null, reply);
            } else if (result.statusCode == servConstants.status_not_found) {
                logger.warn(servConstants.description.orgNotFound);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.description.orgFound);
                helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgFound, servConstants.description.orgFound, result.data, reply);
            }
            logger.trace("Exiting the getOrganization API");
        })
    }
};

exports.editOrganization = {
    description: 'Update organization',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string().required(),
        },
        params: {
            orgId: Joi.string().required()
        },
        payload: {
            orgId: Joi.string(),
            orgName: Joi.string(),
            orgUrl: Joi.string(),
            orgEmail: Joi.string(),
            creationDate: Joi.date()
        }
    },
    handler: function(request, reply) {
        logger.trace("Inside the editOrganizationDetails API", request.payload);
        logger.debug("Modifyng organization details for : ", request.params.orgId);
        Sync(function() {
            var result = orgLogic.editOrg.sync(null, request.params.orgId, request.payload)
            if (result.statusCode == servConstants.status_failure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.servErr, null, reply);
            } else if (result.statusCode == servConstants.status_not_found) {
                logger.warn(servConstants.description.orgNotFound);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.description.orgUpdated, " :", result.data);
                helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgUpdated, servConstants.description.orgUpdated, null, reply);
            }
            logger.trace("Exiting the editOrganization API");
        })
    }
};

exports.deleteOrganization = {
    description: 'Delete organization',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string().required(),
        },
        params: {
            orgId: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        logger.trace("Inside the deleteOrganizationDetails API");
        logger.debug("Deleting organization details is : ", request.params.orgId);
        Sync(function() {
            var result = orgLogic.deleteOrg.sync(null, request.params.orgId)
            if (result.statusCode == servConstants.status_failure) {
                logger.error(servConstants.description.servErr, ": ", result.err);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.servErr, null, reply);
            } else if (result.statusCode == servConstants.status_not_found) {
                logger.warn(servConstants.description.orgNotFound);
                helper.statusGenerator(servConstants.status_failure, servConstants.machine_code.orgNotFound, servConstants.description.orgNotFound, null, reply);
            } else {
                logger.info(servConstants.description.orgDeleted + " With ID :" + request.swagger.params.orgId.value);
                helper.statusGenerator(servConstants.status_success, servConstants.machine_code.orgDeleted, servConstants.description.orgDeleted, null, reply);
            }
            logger.trace("Exiting the deleteOrganization API");
        })
    }
};
