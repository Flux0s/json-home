let router = require("express").Router();
let firebase = require("../services/firebase");

router.post("/sign-in", (req, res, next) => {
    const {
        body: { user }
    } = req;
    firebase
        .signin(user.email, user.password)
        .then((token) => {
            res.json({
                success: true,
                message: "Authentication successful!",
                token: token
            });
        })
        .catch(next);
});

router.post("/sign-up", (req, res, next) => {
    console.log("Received request for sign-up");
});

module.exports = router;
