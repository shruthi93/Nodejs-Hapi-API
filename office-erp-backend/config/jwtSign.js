var JWT   = require('jsonwebtoken');  // used to sign our content
var aguid = require('aguid');
var ES    = require('esta');

module.exports = function sign(request, callback) {
  // payload is the object that will be signed by JWT below
  var payload = { jti:aguid() }; // v4 random UUID used as Session ID below

  if (request.payload && request.payload.email) {
    payload.iss = aguid(request.payload.email);
  } // see: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#issDef
  else { // no email is set (means an anonymous person)
    payload.iss = "anonymous";
  } // this will need to be extended for other auth: http://git.io/pc1c

  var token = JWT.sign(payload, process.env.JWT_SECRET); // http://git.io/xPBn

  var session = {   // set up session record for inserting into ES
    index: "time",
    type:  "session",
    id  :  payload.jti,
    person: payload.iss,
    ua: request.headers['user-agent'],
    ct: new Date().toISOString()
  }

  ES.CREATE(session, function(esres) {
    return callback(token, esres);
  });
}