var JWT   = require('jsonwebtoken');  // used to sign our content
var aguid = require('aguid');
var ES    = require('esta');
console.log("JWT sign module initialized.")
var secret = 'xsdeffDDGRTHSDVFFEREBJKljuxohc'
module.exports = function sign(request, callback) {
  // payload is the object that will be signed by JWT below
  var payload = { jti:aguid() }; // v4 random UUID used as Session ID below
  console.log("REQ payload : ",request.payload)
  if (request.payload && request.payload.username) {
    payload.iss = aguid(request.payload.username);
  } // see: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#issDef
  else { // no username is set (means an anonymous person)
    payload.iss = "anonymous";
  } // this will need to be extended for other auth: http://git.io/pc1c
  console.log("payload :",payload)
  payload.iat = 1488782215
  var token = JWT.sign(payload, secret); // http://git.io/xPBn

  var session = {   // set up session record for inserting into ES
    index: "time",
    type:  "session",
    id  :  payload.jti,
    person: payload.iss,
    ct: new Date().toISOString()
  }
  return callback(token);
}