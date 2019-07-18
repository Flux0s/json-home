var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");

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

console.log("Initialized Firebase app with configs");
var auth = new firebase.auth();
console.log("Initialized Firebase auth.");

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
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(auth.googleProvider);
        next();
    }
};

// class Firebase {
//     constructor() {
//         app.initializeApp(config);

//         this.auth = app.auth();

//         this.googleProvider = new app.auth.GoogleAuthProvider();
//     }
// }

// export default Firebase;
