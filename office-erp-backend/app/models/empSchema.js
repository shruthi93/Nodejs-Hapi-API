// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    empId: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        format: Date,
        required: true
    },
    officialEmail: {
        type: String,
        required: true
    },
    personalEmail: {
        type: String
    },
    designation: {
        type: String
    },
    state: {
        type: String
    },
    joiningDate: {
        type: String,
        format: Date
    },
    leavingDate: {
        type: String,
        format: Date
    },
    experience: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    mobileNo: {
        type: String
    },
    altMobileNo: {
        type: String
    },
    bankAccNo: {
        type: String
    },
    IdType: {
        type: String
    },
    IdNo: {
        type: String
    },
    presentAddress: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    orgId: {
        type: String
    },
    password: {
        type: String
    }

}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it

mongoose.model('Employee', employeeSchema);
