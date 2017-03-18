// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgSchema = new Schema({
    orgId: {
        type: String,
        unique: true,
        required: true
    },
    orgName: {
        type: String,
        required: true
    },
    orgEmail: {
        type: String,
        unique: true,
        required: true
    },
    creationDate: {
        type: String,
        format: Date
    }

}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it

mongoose.model('Organization', orgSchema);
