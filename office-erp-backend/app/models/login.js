'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


/**
 * User Schema
 */
var LogInSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        unique: true,
        default: ''
    },
    password: {
        type: String,
        default: '',
        require: true
    }
});
Mongoose.model('Login', LogInSchema);
