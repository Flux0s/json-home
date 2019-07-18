const express = require("express");
// const dotenv = require("dotenv");
require("dotenv").config();

const path = require("path");
// var cors = require("cors");
var Firebase = require("./firebase");

const app = express();

// const result = dotenv.config();

// if (result.error) {
    // throw result.error;
// }

// console.log(result.parsed);

const cors = require("cors")({ origin: true });
app.use(cors);

// var whitelist = ["http://localhost:3000", "http://localhost:5000"];
// var corsOptions = {
//     origin: function(origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     }
// };

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/../build")));

if(process.env.NODE_ENV != 'development')
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../build/index.html"));
});

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

const port = process.env.PORT || 5000;
app.listen(port);

console.log("Server is listening on port " + port);
