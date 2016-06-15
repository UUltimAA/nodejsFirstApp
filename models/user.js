var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    
    firstName: {required: false, type: String},
    lastName: {required:false, type: String},
    email: {required: false, type: String}
    
});

var User = module.exports = mongoose.model('User', userSchema);
