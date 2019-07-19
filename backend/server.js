const express = require("express");
const path = require("path");
const envConfig = require("dotenv").config();
const unless = require("express-unless");
const cors = require("cors")({ origin: true });
const auth = require("./auth");

var Firebase = require("./firebase");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(auth.required.unless({ path: ["/home", "/sign-in", "/sign-up"] }));
app.use(cors);

// ------- API Endpoints ------- //
app.post("/sign-in", (req, res) => {
    console.log("Attempted to sign in with google!");

    Firebase.doSignInWithGoogle();
});

app.get("/getListOfLights", (req, res) => {});

// ------- Environment Specific Routes ------- //
if (process.env.NODE_ENV == "development") {
    app.post("/sign-up", (req, res) => {
        // console.log("Attempted to sign up with email and password!");
        Firebase.doSignUpWithEmailAndPassword(req, res);
    });
} else if (process.env.NODE_ENV != "development") {
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, "/../build")));

    // Handles any requests that are not specifically defined
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/../build/index.html"));
    });
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log("Server is listening on port " + port);
