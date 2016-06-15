var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/user');
var ShoppingList = require('../models/shoppingList')

var mongoConnection = 'mongodb://localhost:27017/Test';
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

router.get('/api/shoppingList/add/:item/:amount',function(req,res){
    ShoppingList.create({
        items: [{name:req.params.item},
                {amount:req.params.amount}]
        
    },(err, result) => {
        res.json({err: err, ShoppingList: result });

    });
});

router.post('/api/shoppingList/add/:id',function(req,res){
    ShoppingList.findById(req.params.id, (err,result) => {
       result.items.push(req.body);
       result.save();
       res.json(result);
    });
    // ShoppingList.create({
    //     items: [{name:req.params.item},
    //             {amount:req.params.amount}]
        
    // },(err, result) => {
    //     res.json({err: err, ShoppingList: result });

    // });
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
module.exports = router;