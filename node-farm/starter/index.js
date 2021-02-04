const fs = require("fs");
const http = require("http");
const url = require("url");

/*
 *SERVER
 */
const replaceTemplate = (temp, product) => {
  //Using regular expression, to avoid the multiple instance of PRODUCTNAME
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUtRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRITPION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
/**
 * Function that create a server, the callback function in parameter will be called each time the server make a request
 * @req request Which request was call
 * @res response Dealing with the request response
 *
 */
const server = http.createServer((req, res) => {
  const pathName = req.url;
  //Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHTML = dataObj.map((element) => {
      return replaceTemplate(tempCard, element);
    });
    //To convert the array in a big string
    cardsHTML.join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);
    //Product Page
  } else if (pathName === "/products") {
    res.end("This is the product");
    //API Page
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    //404 PAge
  } else {
    //Putting Error, putting headers to inform the browser,client about the response
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found at the moment</h1>");
  }
});
/**
 * Listen method (Port,Host(localhost/127.0.0.1 by default), callback)
 */
server.listen(8080, "127.0.0.1", () => {
  console.log("Listening to requests on port 8080");
});
