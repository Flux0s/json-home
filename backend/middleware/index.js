// Import external library middleware modules
let bodyParser = require("body-parser");
// Import custom middleware modules
let cors = require("./cors");
let jwt = require("./jwt");
let errorHandler = require("./error-handler");
// Import routes
let deviceRouter = require("./routes/devices");
let authRouter = require("./routes/auth");

module.exports = {
    initalize(app) {
        app.use(cors);
        //allow OPTIONS for cors pre-flight on all resources
        app.options("*", cors());
        app.use(jwt.jwtMiddleware());
        app.use(bodyParser.json());

        app.use("/auth", authRouter);
        app.use("/devices", deviceRouter);

        app.use(errorHandler);
    }
};
