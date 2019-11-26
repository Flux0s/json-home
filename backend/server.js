// Import Server
let app = require("express")();
let dotenv = require("dotenv").config();
// Load env into config object
let config = require("./config");
// Import Middleware stack
let middleware = require("./middleware");

// Http server returned from initialization
let server = middleware.initalize(app, config);

const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT;
server.listen(port, process.env.domain, function() {
  console.log("Server listening at: " + process.env.domain + ":" + port);
});
