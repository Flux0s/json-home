let router = require("express").Router()
let firebase = require("../services/firebase-service")

router.post("/sign-in", (req, res, next) => {
  if (req.query["secret"] === "true") {
    const {
      body: { creds }
    } = req
    firebase
      .customSignIn(creds.client_id, creds.client_secret)
      .then((token) => {
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token
        })
      })
      .catch(next)
  } else {
    const {
      body: { user }
    } = req
    firebase
      .signin(user.email, user.password)
      .then((token) => {
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token
        })
      })
      .catch(next)
  }
})

router.post("/sign-up", (req, res, next) => {
  const {
    body: { user }
  } = req
  firebase
    .signup(user.email, user.password)
    .then((token) => {
      res.json({
        success: true,
        message: "Authentication successful!",
        token: token
      })
    })
    .catch(next)
})

router.post("/")

module.exports = router
