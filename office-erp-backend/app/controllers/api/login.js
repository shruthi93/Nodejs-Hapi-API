var mongoose = require('mongoose');
var helper = require('../../helpers/helper.js');
var servConstants = require('../../../config/conf.json').constants;
var qrConstants = require('../../../config/conf.json').queryParam;
var logger = require('../../../logs').logger;
var loginLogic = require('../../business-logic/login.js');
var Sync = require('sync');
var Joi = require('joi');

exports.login = {
    description: 'login',
    tags: ['api'],
    validate: {
        query: {
            apiKey: Joi.string()
        },
        payload: {
            userId: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        logger.trace("Inside the login API")
        logger.debug("Login details : ", request.payload);
        Sync(function() {
            var result = loginLogic.login.sync(null, request.payload)
            logger.debug("The response from login BL : ", result);
            if (result.statusCode == servConstants.statusSuccess) {
                logger.info(servConstants.description.login + " With userID :" + result.data.userId + "and password : "+ result.data.password);
                helper.statusGenerator(servConstants.statusSuccess, servConstants.machineCode.login, servConstants.description.login, null, reply);
            } else {
                logger.error(servConstants.description.loginErr, " : ", result.err);
                helper.statusGenerator(servConstants.statusFailure, servConstants.machineCode.servErr, result.err, null, reply);
            }
            logger.trace("Exiting the login API");
        })
    }
};