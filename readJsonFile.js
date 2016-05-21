const fs    = require("fs");
const path  = require("path")
module.exports = readJsonFile;

function readJsonFile(fileName,fn){
    
    fs.readFile(path.join(__dirname,fileName),"utf-8",toJSON)
    
    function toJSON (err,array){
        fn(null,JSON.parse(array));
    }
}