"use strict";
const http         = require("http")
const dboxConf     = require("./config.json").dropbox
const node_dropbox = require('node-dropbox');
const querystring  = require("query-string");
const printFiles   = require("./templateHtml");
const server       = http.createServer();
const port         = 4000;  // PLEASE DO NOT CHANGE THE PORT BECAUSE DROPBOX WILL TRY TO REQUEST THIS ENDPOINT
let   api;

server.on("request",   onRequest);
server.on("listening", onListening);
server.listen(port);

function onRequest(req, res){
    
    res.setHeader("Content-Type", "text/html");
    req.params = req.url.indexOf("?") > -1 ?
                 getQueryString(req.url) : {};
    
    if(req.url === "/"){
        return res.end(builOauth2Url(dboxConf.client_id,dboxConf.redirect_uri));
    }
    if(req.url.indexOf("/listFiles") > -1){
       return node_dropbox.AccessToken(dboxConf.client_id, dboxConf.secret, req.params.code, dboxConf.redirect_uri, getToken.bind(null,res)); 
    }
    
    if(req.url.indexOf("/getDir") > -1){
       return getMetaData(res,req.params.path);
    }
    
    console.log(req.url)
    res.statusCode = 404;
    res.end("Not Found 404");
}

function onListening (){
    console.log("Listening on port " + port);
}

function getQueryString (url){
    let   query = url.slice(url.indexOf("?"));
    return querystring.parse(query);
}

function builOauth2Url (id,backUrl){
    return `<a href="https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${id}&redirect_uri=${backUrl}">Authorize</a>`;
}

function errorHandle(res){
    console.error("token expired redirecting ...");
    res.writeHead(301, {
        'Location': '/'
    });
    res.end();
}

function getToken(res ,err, body) {
    if(err || !body){
         return errorHandle(res);
    }
    api = node_dropbox.api(body.access_token); 
    getMetaData(res,"/");
}

function getMetaData (res,path){
    
    api.getMetadata(path,response);
    
    function response (err, rees, body) {
        if(err || !body.path){
            return errorHandle(res);
        }
        res.end(printFiles(body.path,body.contents));
    }
}