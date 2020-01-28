let firebase = require("firebase")
require("firebase/auth")
require("firebase/database")
let jwt = require("../jwt")
let clientId, clientSecret

module.exports = {
  // Initialize firebase configuration

  initialize: (firebaseConfig, authConfig) => {
    // console.log(config);
    firebase.initializeApp(firebaseConfig)
    clientId = authConfig.client_id
    clientSecret = authConfig.client_secret
  },

  // Authentication methods

  signup: (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        return doSignInWithEmailAndPassword(user.email, user.password)
      })
  },
  signin: (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return jwt.generateJWT(user.uid)
      })
  },
  customSignIn(client_id, client_secret) {
    if (client_id === clientId && client_secret === clientSecret) {
      return Promise.resolve(jwt.generateJWT(-1))
    } else {
      console.log(clientId)
      console.log(client_id)
      console.log(clientSecret)
      console.log(client_secret)
      return Promise.reject(new Error("Invalid client ID or secret!"))
    }
  }

  // *** Depreciated *** Database functions

  // getFromDatabase: (requestObjectPath) => {
  //     var getRequestReference = database.ref(requestObjectPath);
  //     // Return a promise to the requested object path
  //     return getRequestReference.once("value");
  // }
}
