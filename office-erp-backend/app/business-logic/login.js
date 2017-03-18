var mongoose = require('mongoose');
var employee = mongoose.model('Employee');
var login = mongoose.model('Login');
var logger = require('../../logs').logger;
var loginDao = require('../dao/login.js');
var servConstants = require('../../config/conf.json').constants;
var Sync = require('sync');

module.exports = {

    login: function(request, callback) {
        logger.trace("Inside the login BL", request);

        var loginRecord = new login(request);
        console.log ("INSIDE THE LOGIN : ", loginRecord )
        Sync(function() {
            var result = loginDao.login.sync(null, loginRecord);
            logger.debug("The response from login DAO : ", result)
            process.nextTick(function() {
                callback(null, result);
            })
        })
    }
}
