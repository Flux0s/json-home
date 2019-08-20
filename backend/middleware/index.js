// Import middleware modules
let cors = require("./cors");

module.exports = {
    initalize(app) {
        app.use(cors);
    }
};
