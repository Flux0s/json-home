let cors = require("cors");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);
