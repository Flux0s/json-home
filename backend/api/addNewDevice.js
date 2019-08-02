const Firebase = require("../firebase");
const deviceSchema = require("../schema");

module.exports = addDevice;

function addDevice(req, res, next) {
    const deviceObject = deviceSchema.parse(req.body.device);
    console.log(deviceObject);
    next("This API endpoint has not been implemented yet");
    return;

    const devicesObjectPath = "/devices/";
    Firebase.appendToDatabase(devicesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            // res.send(snapshot.val());
        })
        .catch(function(error) {
            next("Encountered error while getting list of devices: " + error);
        });
    // setTimeout(function() {
    //     return res.status(200).json(defaultServerDevice);
    // }, 5000);
}
