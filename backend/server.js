const express = require("express");
const path = require("path");
const envConfig = require("dotenv").config();

const cors = require("cors")({ origin: true });
var Firebase = require("./firebase");

const app = express();

app.use(cors);

// app.options("/sign-in", cors()); // enable pre-flight request for sign-in request
app.post("/sign-in", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    Firebase.doSignInWithGoogle();
    console.log("Attempted to sign in with google!");
});

if (process.env.NODE_ENV != "development") {
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
