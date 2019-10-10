let firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
let jwt = require("../jwt");

module.exports = {
    // Initialize firebase configuration

    initialize: (config) => {
        // console.log(config);
        firebase.initializeApp(config);
    },

    // Authentication methods

    signup: (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                return doSignInWithEmailAndPassword(user.email, user.password);
            });
    },
    signin: (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                return jwt.generateJWT(user.uid);
            });
    },

    // Database functions

    getFromDatabase: (requestObjectPath) => {
        var getRequestReference = database.ref(requestObjectPath);
        // Return a promise to the requested object path
        return getRequestReference.once("value");
    }
};
