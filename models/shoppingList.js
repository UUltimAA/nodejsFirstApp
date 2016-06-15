var mongoose = require('mongoose');

var shoppingListSchema = mongoose.Schema({
    
    creationDate: {required: false, type: Date},
    items: [{
         name: {required: false, type: String},
         amount: {required: false, type: Number}
    }],
    closingDate: {required: false, type: Date}
    
});

var List = module.exports = mongoose.model('shoppingList', shoppingListSchema);