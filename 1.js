"use strict";
const async        = require("async")
const readJsonFile = require("./readJsonFile")

async.parallel([
        readJsonFile.bind(null,"a.json"),
        readJsonFile.bind(null,"b.json")
],show);

function show(err,arrays) {
    const result = arrays[0].sumIntArray(arrays[1]);
    console.log(result);
}

Array.prototype.sumIntArray = function (array){
    
    const minLen     =   array.length < this.length ?
                         array.length : this.length;
    const bigArray   =   array.length > this.length ?
                         array : this;
    const finalArray =   [];
    
    for (let i = 0; i < minLen ; i++ ){
          finalArray.push(this[i] + array[i]);
    }
    return finalArray.concat(bigArray.slice(minLen));
}