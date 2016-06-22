var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/user');
var ShoppingList = require('../models/shoppingList');

//'mongodb://' + process.env.MONGO_PATH + '/Test'; // 'mongodb://localhost:27017/Test';
 var mongoConnection = "";

if (process.env.MONGO_USER){
    mongoConnection = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@' + process.env.MONGO_PATH;
}
else{
    mongoConnection = 'mongodb://' + process.env.MONGO_PATH;
}

mongoose.connect(mongoConnection);

var db = mongoose.connection;

router.get('/api/user',function (req,res) {
    Users.find({}, (err,result) => {
        res.json({err: err, users: result });        
    });
});

router.get('/api/user/:id',function (req,res) {
   Users.findById(req.params.id, (err,result) => {
        res.json({err: err, users: result });
   });
});

router.get('/api/user/add/:firstName/:lastName/:email',function (req,res) {
    // req.params.
    Users.create({
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        email: req.params.email
        
    }, (err, result) => {
        res.json({err: err, users: result });        
    });
});



// router.get('/api/shoppingList/add/:item/:amount',function(req,res){
//     ShoppingList.create({
//         items: [{name:req.params.item},
//                 {amount:req.params.amount}]
        
//     },(err, result) => {
//         res.json({err: err, ShoppingList: result });

//     });
// });

router.get('/api/shoppingList/new',function(req,res){
    ShoppingList.create({
        creationDate: new Date,
        items: []},
        function(err, result) {
        res.json({err: err, ShoppingList: result });

    });
});

router.post('/api/shoppingList/new',function(req,res){
    ShoppingList.create({
        creationDate: new Date,
        items: []},
        function(err, result) {
        res.json({err: err, ShoppingList: result });

    });
});

router.post('/api/shoppingList/add',function(req,res){
    ShoppingList.findOne({}, {}, {sort: { 'created_at': -1}}, function(er, lastShoppingList){
        var lastId = lastShoppingList._id;
        console.log(lastId);
        ShoppingList.findById(lastId, (err,result) => {
            result.items.push(req.body);
            result.save();
            res.json(result);
        });
    });
});

router.post('/api/shoppingList/add/:id',function(req,res){
    ShoppingList.findById(req.params.id, (err,result) => {
       result.items.push(req.body);
       result.save();
       res.json(result);
    });
});

router.get('/api/shoppingList', function(req,res) {
    ShoppingList.find({}, (err,result) => {
        res.json({err: err, ShoppingList: result }); });
});

router.post('/api/item',function (req,res) {
    item.find({}, (err,result) => {
        res.json({err: err, item: result});
    });
});

router.post('/api/item/:id',function (req,res) {
    item.findById(req.params.id, (err,result) => {
        res.json({err: err, item: result});
    });
});

router.get('/api/calc',function (req,res) {
    // ShoppingList.aggregate([
    //     { $unwind: {
    //         path: 'items',
    //         preserveNullAndEmptyArrays: false
    //     }},
    //     { $group: 
    //         {_id: "$item.name",total: {$sum: "$amount"}}
    //     }], function(err,result){
    //     res.json({error: err, result: result});
    // });

    ShoppingList.aggregate([
        { $unwind: {
            path: '$items',
            includeArrayIndex: 'itemIndex',
            preserveNullAndEmptyArrays: false
        }},
        { $group: {
           _id: "$items.name",
           total: {$sum: "$items.amount"}
        }
    }], function(err,result){
        // console.log(process.env);
        res.json({error: err, result: result, monPath: process.env.MONGO_PATH});
    });

});

module.exports = router;