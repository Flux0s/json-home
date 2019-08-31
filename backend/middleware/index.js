// Import external library middleware modules
let bodyParser = require("body-parser");
// Import custom middleware modules
let cors = require("./cors");
let jwt = require("./jwt");
let errorHandler = require("./error-handler");
// Import routes
let deviceRouter = require("./routes/devices");
let authRouter = require("./routes/auth");
// Import modules that need to be loaded with config
let firebase = require("./services/firebase-service");
let mongoose = require("./mongoose");

module.exports = {
    initalize(app, config) {
        app.use(cors);
        //allow OPTIONS for cors pre-flight on all resources
        app.options("*", cors);
        app.use(jwt.jwtMiddleware(config.jwt));
        app.use(bodyParser.json());
        // Configure routes
        app.use("/auth", authRouter);
        app.use("/devices", deviceRouter);
        // Configure global error handler
        app.use(errorHandler);
        // Initialize modules with configuration
        firebase.initializeApp(config.firebase);
        mongoose.initalize(config.database);
    }
};
