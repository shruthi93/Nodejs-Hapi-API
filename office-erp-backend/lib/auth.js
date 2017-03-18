'use strict';

//var BasicAuth = require('hapi-auth-basic')
var jwt = require('jsonwebtoken')
var ES = require('esta');
var localStorage = require('localStorage')

exports.register = function(server, options, next) {

    server.auth.strategy('standard', 'cookie', {
        password: options.cookieSecret, // cookie secret
        cookie: options.cookieName, // Cookie name
        isSecure: false, // required for non-https applications
        clearInvalid: true,
        ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
        redirectTo: '/login',
        redirectOnTry: false
    });



    var accounts = {
        123: {
            id: 123,
            user: 'john',
            fullName: 'John Doe',
            scope: ['a', 'b']
        }
    };


    var privateKey = 'xsdeffDDGRTHSDVFFEREBJKljuxohc';

    var validateFunc = function(decoded, request, callback) {

        var session = {
            index: "time",
            type: "session",
            id: decoded.jti // use SESSION ID as key for sessions
        }
        console.log("Date : ",Math.floor(Date.now() / 1000) - 30)
        if (request.auth.token === localStorage.getItem('jwtToken')) {
            console.log("Session is valid.")
            return callback(null, true); // session is valid
        } else {
            console.log("Session is invalid.")
            return callback(null, false); // session is invalid
        }
    };
    server.auth.strategy('jwt', 'jwt', {
        key: privateKey,
        validateFunc: validateFunc
    });

    //    server.auth.default({
    //         strategy: 'jwt'
    //    });

    // Blacklist all routes.
    // server.auth.default({
    //     strategy: 'standard'
    // });
    // server.auth.strategy('simple', 'bearer-access-token', {
    //     allowQueryToken: true, // optional, true by default 
    //     allowMultipleHeaders: false, // optional, false by default 
    //     accessTokenName: 'access_token', // optional, 'access_token' by default 
    //     validateFunc: function(token, callback) {
    //         console.log("Inside auth bearer : ",token)
    //         // For convenience, the request object can be accessed 
    //         // from `this` within validateFunc. 
    //         var request = this;

    //         // Use a real strategy here, 
    //         // comparing with a token from your database for example 
    //         if (token === "1234") {
    //             console.log("Auth Success")
    //             return callback(null, true, { token: token }, { artifact1: 'an artifact' });
    //         }

    //         return callback(null, false, { token: token }, { artifact1: 'an artifact' });
    //     }
    // });



    return next();
};

exports.register.attributes = {
    name: 'auth',
    dependencies: ['context', 'hapi-auth-cookie', 'mongoose', 'hapi-auth-jwt2']
};
