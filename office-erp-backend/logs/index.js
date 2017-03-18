var log4js = require('log4js');
var logger = log4js.getLogger();

logger.info("Logger Intialized");

// log4js.loadAppender('file');
// log4js.addAppender(log4js.appenders.file('./logs/employee.log'), 'employee');
//logger.setLevel('TRACE');
module.exports = {
    setLevelDev: function() {
    	logger.info("Log Level : TRACE")
        logger.setLevel('TRACE')
    },
    setLevelProd: function() {
    	logger.info("Log Level : INFO")
        logger.setLevel('TRACE')
    },
    logger:logger
}
// module.exports = logger;
