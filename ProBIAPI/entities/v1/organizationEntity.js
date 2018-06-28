const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrganizationEntitySchema = new Schema({
    name: {
     type: String   
    },

    email: {
        type: String
    },

    addressDetails: {
        address: {
            type: String
        },

        city: {
            type: String
        },

        country: {
            type: String
        },

        postalCode: {
            type: Number
        }
    },
    
    contactNumber: {
        type: Number
    }
});

module.exports = mongoose.model('OrganizationEntity', OrganizationEntitySchema);