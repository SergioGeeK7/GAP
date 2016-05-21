"use strict";
const readJsonFile = require("./readJsonFile")
readJsonFile("a.json",resolve);

function resolve (err,array) {
    let total  = array.sum();
    let isEven = total % 2 === 0;
    if(isEven){
        readJsonFile("b.json", printEven );
    }
    else {
        readJsonFile("c.json", sumOdd );
    }
}

function printEven (err,array){
     array.filter((n)=> n % 2 === 0 )
          .forEach((n)=>console.log(n));
}

function sumOdd (err,array){
     let sum = array.filter((n)=> n % 2 === 1 )
                    .sum();
     console.log(sum);
}

Array.prototype.sum = function (){
    return this.reduce((num1,num2)=> num1 + num2);
}