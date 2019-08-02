const Firebase = require("./firebase");
const schemas = require("./schema");

module.exports = { addDevice, getDevices };

function addDevice(req, res, next) {
    if (schemas.deviceSchema.validate(req.body.device)) {
        next("Device in response did not match schema");
        return;
    }
    const deviceObject = schemas.deviceSchema.parse(req.body.device);
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
}

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
    setTimeout(function() {
        Firebase.getFromDatabase(devicesObjectPath)
            .then(function(snapshot) {
                // console.log(snapshot.val());
                res.send(snapshot.val());
            })
            .catch(function(error) {
                next(
                    "Encountered error while getting list of devices: " + error
                );
            });
        //     return res.status(200).json(defaultServerDevice);
    }, 3500);
}
