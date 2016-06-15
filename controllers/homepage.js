var express = require('express');
var router = express.Router();

router.get('/test' , function(req, res){
    console.log('got a request');
    // res.send('did it');
    res.render('index', 
    {
        username:'Tantalas1', 
        email: 'ofir@gmail.com'
    });
});

router.get('/',function(req,res){
    var fs = 
    res.render('homepage',{
        currentDate:new Date,
        randomNum:Math.random() *10,
        username:'Tblog'
    })
})

//localhost:3000/mul?first=12&second=34
router.get('/mul/:first/:second',function (req,res){
    console.log(req.params.first);
    var mul = req.params.first * req.params.second; //req.require('/mul');
    res.send(mul.toString());
    
});

//localhost:3000/getdate

router.get('/getdate',function (req,res) {
    var currentDate = new Date();
    res.send(currentDate.toString());
        
});

router.get('/pipe',function (req,res) {
    var fs = require('fs');
    
    var rstream = fs.createReadStream('stam.txt');
    var wstream = fs.createWriteStream('output.txt');
    
    rstream
            .pipe(wstream)
            .on('data', function(chunk){
                chunk
            })
            .on('finish', function(){
        res.send('done');
    })
    
    // res.send(currentDate.toString());
        
});

module.exports = router;

