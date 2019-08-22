// Import external library middleware modules
let bodyParser = require("body-parser");
// Import custom middleware modules
let cors = require("./cors");
let jwt = require("./jwt");
let errorHandler = require("./error-handler");
// Import routes
let deviceRouter = require("./routes/devices");
let authRouter = require("./routes/auth");
let firebase = require("./services/firebase");

module.exports = {
    initalize(app, config) {
        app.use(cors);
        //allow OPTIONS for cors pre-flight on all resources
        app.options("*", cors);
        app.use(jwt.jwtMiddleware());
        app.use(bodyParser.json());
        // Configure routes
        app.use("/auth", authRouter);
        app.use("/devices", deviceRouter);
        app.use(errorHandler);

        // Initialize modules with configuration
        firebase.initializeApp(config.firebase);
    }
};
