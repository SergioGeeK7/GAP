const path = require("path")
module.exports = printFiles;

function printFiles (fpath,folder){

    return folder
             .reduce(makeTemplate,`<ul> <li> <a href='/getDir?path=${fpath}/..'>.. </a> </li> `) + "</ul>";
    
    function makeTemplate (str,file){
        if(!file.is_dir){
            str += "<li>" + path.basename(file.path) + "</li>";
        }else{
            str += `<li> <a href='/getDir?path=${file.path}'> ${path.basename(file.path)} </a> </li>`;
        }  
        return str;
    }
}