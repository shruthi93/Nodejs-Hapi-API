'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');
const User = Mongoose.model('User');
var logger = require('../../../logs').logger;
//var jwt = require('jsonwebtoken')
var secret = 'xsdeffDDGRTHSDVFFEREBJKljuxohc'
    //var ES = require('esta');
var localStorage = require('localStorage')

exports.showForm = {
    description: 'Returns the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    handler: function(request, reply) {
        logger.trace("Inside the login API");
        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        reply.view('auth/login');

    }
};

exports.postForm = {
    description: 'Post to the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        crumb: {
            key: 'crumb',
            source: 'payload',
        }
    },
    validate: {
        payload: {
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20)
        },
        failAction: function(request, reply, source, error) {

            // Username, passowrd minimum validation failed
            request.yar.flash('error', 'Invalid username or password');
            return reply.redirect('/login');
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }

        User.findByCredentials(request.payload.username, request.payload.password, function(err, user, msg) {
            if (err) {
                // Boom bad implementation
                request.yar.flash('error', 'An internal server error occurred');
                return reply.redirect('/login');
            }
            if (user) {
                console.log("User exists : ", user)
                    // ES.CREATE(cookie_options, function(esres) {
                    //     return callback(token, esres);
                    // });
                    // request.cookieAuth.set(user);
                    // return reply({ text: 'You have been authenticated!' })
                    //     .header("Authorization", token) // where token is the JWT 
                    //     .state("token", token, cookie_options)
                    //     .redirect('/account');

                var JWT = require('../../../lib/jwtSign.js');
                JWT(request, function(token) {
                    console.log("TOKEN : ", token);
                    localStorage.setItem('jwtToken',token);
                    return reply().header("Authorization", token).redirect('/account');;
                });
                //return reply.redirect('/account');
            } else {
                // User not fond in database
                request.yar.flash('error', 'Invalid username or password');
                return reply.redirect('/login');
            }
        });

    }
};
