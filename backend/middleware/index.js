// Import external library middleware modules
let bodyParser = require("body-parser");
// Import custom middleware modules
let cors = require("./cors");
let jwt = require("./jwt");
let errorHandler = require("./error-handler");
// Import routes
let lightRouter = require("./routes/lights");
let authRouter = require("./routes/auth");
// Import modules that need to be loaded with config
let firebase = require("./services/firebase-service");
let mongoose = require("./mongoose");
let socketIO = require("./socket.io");

module.exports = {
  initalize(app, config) {
    // console.log(config);
    app.use(cors);
    //allow OPTIONS for cors pre-flight on all resources
    app.options("*", cors);
    app.use(jwt.jwtMiddleware(config.jwt));
    app.use(bodyParser.json());
    // Configure routes
    app.use("/auth", authRouter);
    app.use("/lights", lightRouter);
    // Configure global error handler
    app.use(errorHandler);
    // Initialize modules with configuration
    firebase.initialize(config.firebase);
    mongoose.initialize(config.database);
    // Initialize server object
    var server = require("http").Server(app);
    // Initialize socket.io event handler with the http server
    socketIO.initialize(server);

    return server;
  }
};
