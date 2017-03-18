var mongoose = require('mongoose');
var logger = require('../../logs').logger;
var helper = require('../helpers/helper.js');
var servConstants = require('../../config/conf.json').constants;
var qrConstants = require('../../config/conf.json').queryParam;
var loginDB = mongoose.model('Login');

logger.trace("Inside the login DAO layer")

var responseObj = {
    statusCode: '',
    message: '',
    description: '',
    data: '',
    err: ''
}

module.exports = {

    login: function(request, callback) {
        logger.trace("Inside the login DAO")
        logger.debug("Saving login details to DB : ", request)

        request.save(function(err, res) {
            if (err) {
                logger.error(servConstants.description.loginErr ," : ", err);
                responseObj.statusCode = servConstants.statusFailure;
                responseObj.message = servConstants.machineCode.servErr;
                responseObj.description = servConstants.description.loginErr;
                responseObj.data = null
                responseObj.err = err
            } else {
                logger.info(servConstants.description.login);
                logger.trace("RESPONSE: ", request);
                responseObj.statusCode = servConstants.statusSuccess;
                responseObj.message = servConstants.machineCode.login;
                responseObj.description = servConstants.description.login;
                responseObj.data = res;
                responseObj.err = null;
            }
            process.nextTick(function() {
                callback(null, responseObj);
            })
        });
    }
}
