var express = require("express");
var router = express.Router();

router.post("/sign-in", (req, res) => {
    console.log("Received request for signin");
});

router.post("/sign-up", (req, res) => {
    console.log("Received request for signin");
});

module.exports = router;
