'use strict';

var jwt = require('jsonwebtoken')


exports.register = function(server,options, next) {
    console.log("Inside new auth.")
    // var accounts = {
    //     123: {
    //         id: 123,
    //         user: 'john',
    //         fullName: 'John Doe',
    //         scope: ['a', 'b']
    //     }
    // };


    // var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

    // // Use this token to build your request with the 'Authorization' header.  
    // // Ex:
    // //     Authorization: Bearer <token>
    // var token = jwt.sign({ accountId: 123 }, privateKey, { algorithm: 'HS256' });
    // console.log("TOKEN : ", token)
    // var validate = function(request, decodedToken, callback) {
    //     console.log("decodedToken", decodedToken)
    //     var error,
    //         credentials = accounts[decodedToken.accountId] || {};
    //     console.log("credentials : ", credentials)
    //     if (!credentials) {
    //         console.log("NO AUTH : ", request.auth)
    //         process.nextTick(function() {
    //             callback(error, false, credentials);
    //         })
    //     } else {
    //         console.log("AUTH : ", request.auth)
    //         process.nextTick(function() {
    //             callback(error, true, credentials)
    //         })

    //     }
    // };

    // server.auth.strategy('jwt', 'jwt', {
    //     key: privateKey,
    //     validateFunc: validate,
    //     verifyOptions: { algorithms: ['HS256'] } // only allow HS256 algorithm
    // });
    // Blacklist all routes.
    // server.auth.default({
    //     strategy: 'standard'
    // });
    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true, // optional, true by default 
        allowMultipleHeaders: false, // optional, false by default 
        accessTokenName: 'access_token', // optional, 'access_token' by default 
        validateFunc: function(token, callback) {
            console.log("Inside auth bearer : ",token)
            // For convenience, the request object can be accessed 
            // from `this` within validateFunc. 
            var request = this;

            // Use a real strategy here, 
            // comparing with a token from your database for example 
            if (token === "1234") {
                console.log("Auth Success")
                callback(null, true, "hihhi");
            }

            callback(null, false, "hihhi");
        }
    });



    return next();
};

exports.register.attributes = {
    name: 'newauth',
    dependencies: ['context', 'hapi-auth-cookie', 'mongoose', 'hapi-auth-bearer-token']
};
