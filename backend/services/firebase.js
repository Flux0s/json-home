var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
const jwt = require("../jwt");

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
var database = new firebase.database();

module.exports = {
    // Authentication methods

    doSignUpWithEmailAndPassword: function(req, res, next) {
        const {
            body: { user }
        } = req;
        if (!user.email) {
            next("Email not found in sign-in request");
            return;
        }
        if (!user.password) {
            next("Password not found in sign-in request");
            return;
        }

        console.log("Sign up request for user: ", user);

        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(function(newUser) {
                console.log("uid", newUser.user.uid);

                doSignInWithEmailAndPassword(req, res, next);
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
            next("Email not found in sign-in request");
            return;
        }
        if (!user.password) {
            next("Password not found in sign-in request");
            return;
        }
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function(newUser) {
                console.log("Authenticated user with ID: ", newUser.user.uid);
                res.send({ token: jwt.generateJWT(newUser.user.uid) });
            })
            .catch(function(error) {
                next(error);
            });
    },

    // Database functions

    getFromDatabase: function(requestObjectPath) {
        var getRequestReference = database.ref(requestObjectPath);
        // Return a promise to the requested object path
        return getRequestReference.once("value");
    }

    
};
