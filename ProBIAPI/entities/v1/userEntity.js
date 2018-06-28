const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserEntitySchema = new Schema({
    organizationId: {
        type: String        
    },
    companyId: {
        type: String        
    },
    firstName: {
        type: String        
    },
    lastName: {
        type: String        
    },
    email :{
            type: String
    },
    password:{
        type: String
    },
    accessString: {type: [Number]}
});

module.exports = mongoose.model('UserEntity', UserEntitySchema);