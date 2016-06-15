var express = require('express');
var router = express.Router();

function isNumber(str){
    
    if ((str != null && str != undefined) && (str[0] >='0') && (str[0]<='9')) {
        console.log('working on ' + str[0] + ' ( ' + (str[0] >='0') + ',' + (str[0]<='9') + ')');        
        return true;
    }
    else {
        console.log('working on ' + str + ' is not number');
        return false;
    }
}

function calculate(numOperand, num2){
    //if (num2 == undefined) return numOperand;
    //if (numOperand == undefined) return 0;
    
    var operand = numOperand.substring(numOperand.length-1);
    var num1 = parseInt(numOperand.substring(0,numOperand.length-1));
    num2 = parseInt(num2);
    
    console.log('calculating...');
    console.log(num1);
    console.log(operand);
    console.log(num2);
    
    switch (operand) {
        case '+':
            return (num1) + (num2);  
        case '-':
            return (num1) - (num2);
        case '*':
            return (num1) * (num2);
        case '/':
            return (num1) / (num2);
                     
        default:
            break;
    }
}

router.get('/sum/:first/:second',function (req,res) {
    var result = (1*req.params.first) + (1*req.params.second);
    res.send(result.toString());
});

router.get('/sub/:first/:second',function (req,res) {
    var result = (1*req.params.first) - (1*req.params.second);
    res.send(result.toString());
});

router.get('/div/:first/:second',function(req,res) {
    var result = (1*req.param.first) / (1*req.param.second);
    res.send(result.toString());
});

router.get('/mul/:first/:second',function(req,res){
    var result = (1*req.param.first) * (1*req.param.second);
    res.send(result.toString());
});

router.get('/smartCalc/:myExpression',function(req,res) {
     var arr = [];
    var str = req.params.myExpression;
    for (var index = 0; str.length != 0 ; index++) {
        arr[index] = str.substring(0,1);
        str = str.substring(1);            
    }
    
    //for(var index = 0; 0< arr.length;index++){
    var reduced = arr.reduce( (a,b) => {
        if(isNumber(a) && !isNumber(b)){
            console.log('concatinating ' + a + ' with ' + b); 
            return a+b;
            }
         else{ 
            console.log('calculation ' + a + ' with ' + b); 
            return calculate(a,b).toString();
         }
            
        });
    
    //);
   res.json({a: reduced});
    //res.send(arr.toString());
    
})
module.exports = router;