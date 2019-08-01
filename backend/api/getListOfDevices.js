const Firebase = require("../firebase");

module.exports = getDevices;

const defaultServerDevice = [
    {
        id: 1,
        name: "Server Stored Device",
        description: "This device was retrieved from the server."
    }
];

function getDevices(req, res, next) {
    // next("This API endpoint has not been implemented yet");
    const devicesObjectPath = "/devices/";
    Firebase.getFromDatabase(devicesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            res.send(snapshot.val());
        })
        .catch(function(error) {
            next("Encountered error while getting list of devices: " + error);
        });
    // setTimeout(function() {
    //     return res.status(200).json(defaultServerDevice);
    // }, 5000);
}
