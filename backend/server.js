const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const envConfig = require("dotenv").config();

const jwt = require("./jwt");
const Firebase = require("./firebase");
const errorHandler = require("./error-handler");
const getDevices = require("./api/getListOfDevices");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors);

// use JWT auth to secure the api
app.use(jwt.jwtMiddleware());

//allow OPTIONS for cors pre-flight on all resources
app.options("*", cors());

// ------- API Endpoints ------- //
app.post("/sign-in", cors(), (req, res, next) => {
    // console.log("User attempted to sign in!");
    Firebase.doSignInWithEmailAndPassword(req, res, next);
});
app.get("/getListOfDevices", (req, res, next) => {
    getDevices(req, res, next);
});

// ------- Environment Specific Routes ------- //
if (process.env.NODE_ENV === "development") {
    console.log(
        "Server is running in development env. Sign-up endpoint has been opened!"
    );
    app.post("/sign-up", (req, res, next) => {
        // console.log("Attempted to sign up with email and password!");
        Firebase.doSignUpWithEmailAndPassword(req, res, next);
    });
} else if (process.env.NODE_ENV !== "development") {
    console.log(
        "Server is running in non-development env. Some API endpoints will be unavailable!"
    );
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, "/../build")));

    // Handles any requests that are not specifically defined
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/../build/index.html"));
    });
}

// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === "production" ? 80 : 5000;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
