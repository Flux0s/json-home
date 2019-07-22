var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
const jwt = require("./jwt");

config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

var auth = new firebase.auth();

module.exports = {
    isAuthenticated: function(req, res, next) {
        var user = firebase.auth().currentUser;
        if (user !== null) {
            req.user = user;
            next();
        } else {
            res.redirect("/log-in");
        }
    },
    doSignInWithGoogle: function(req, res, next) {
        console.log("Attempting launch google sign-in popup...");
        console.log(
            "Blocked attempted google login. This function is depreciated."
        );
        // var provider = new firebase.auth.GoogleAuthProvider();
        // auth.signInWithPopup(auth.googleProvider);
    },
    doSignUpWithEmailAndPassword: function(req, res, next) {
        const {
            body: { user }
        } = req;
        if (!user.email) {
            console.log("Error: Did not find email in sign up request!");
            return res.status(422).json({
                errors: {
                    email: "is required"
                }
            });
        }

        if (!user.password) {
            console.log("Error: Did not find password in sign up request!");

            return res.status(422).json({
                errors: {
                    password: "is required"
                }
            });
        }

        console.log("Sign up request for user: ", user);

        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(function(newUser) {
                console.log("uid", newUser.uid);

                //Here if you want you can sign in the user
            })
            .catch(function(error) {
                next(error);
            });
    },
    doSignInWithEmailAndPassword: function(req, res, next) {
        const {
            body: { user }
        } = req;
        if (!user.email) {
            console.log("Error: Did not find email in sign in request!");
            return res.status(422).json({
                errors: {
                    email: "is required"
                }
            });
        }

        if (!user.password) {
            console.log("Error: Did not find password in sign in request!");

            return res.status(422).json({
                errors: {
                    password: "is required"
                }
            });
        }
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function(newUser) {
                console.log("Authenticated user with ID: ", newUser.user.uid);
                res.send(jwt.generateJWT(newUser.user.uid));
            })
            .catch(function(error) {
                next(error);
            });
    }
};
