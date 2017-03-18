var ES = require('esta');
console.log("Inside validate JWT")
var validateFunc = function(decoded, request, callback) {
   var localStorage = require('localStorage')

    var session = {
            index: "time",
            type: "session",
            id: decoded.jti // use SESSION ID as key for sessions
        } // jti? >> http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#jtiDef

    

    // ES.READ(session, function(res){
    //   console.log("Session response : ",res)

    //   if(res.found && !res._source.ended) {
    //     console.log("The session is VALID")
    //     return callback(null, true); // session is valid
    //   }
    //   else {
    //     console.log("The session is INVALID")
    //     return callback(null, false); // session expired
    //   }
    // });
};

module.exports = validateFunc;
