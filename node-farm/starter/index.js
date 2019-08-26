const fs = require('fs');
const http = require('http');

////////////////////////
/////SERVER
/**
 * Function that create a server, the callback function in parameter will be called each time the server make a request
 * @req request Which request was call
 * @res response Dealing with the request response
 * 
 */
const server = http.createServer((req,res)=>{
  console.log(req);
  res.end('Hello from the server!');
});
/**
 * Listen method (Port,Host(localhost/127.0.0.1 by default), callback)
 */
server.listen(8000, '127.0.0.1',()=>{
  console.log('Listening to requests on port 8000');
})