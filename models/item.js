var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    
  name: {require:false, type: String},
  amount: {require:false, type: String}
      
});

var item = module.exports = mongoose.model('item', itemSchema);