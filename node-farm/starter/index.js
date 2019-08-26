// const fs = require('fs');
const http = require('http');
const url = require("url");


////////////////////////
/////SERVER
/**
 * Function that create a server, the callback function in parameter will be called each time the server make a request
 * @req request Which request was call
 * @res response Dealing with the request response
 * 
 */
const server = http.createServer((req,res)=>{
  const pathName = req.url;
  if(pathName === '/' || pathName === '/overview'){
    res.end("This is the overview!");
  }else if(pathName === '/products'){
    res.end('This is the product');
  }else{
    //Putting Error, putting headers to inform the browser,client about the response
    res.writeHead(404,{
      'Content-type':'text/html',
      'my-own-header' : 'hello-world'
    })
    res.end("<h1>Page not found</h1>");
  }

  res.end('Hello from the server!');
});
/**
 * Listen method (Port,Host(localhost/127.0.0.1 by default), callback)
 */
server.listen(8000, '127.0.0.1',()=>{
  console.log('Listening to requests on port 8000');
})