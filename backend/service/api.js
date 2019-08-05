const Firebase = require("./firebase");
const DeviceList = require("./repositories/deviceList");

module.exports = { addDevice, getDeviceTypes, getDevices, getEpmtyDevice };

function addDevice(req, res, next) {
    // const number = new Number();

    // console.log(number);
    // if (schemas.deviceSchema.validate(req.body.device)) {
    //     next("Device in response did not match schema");
    //     return;
    // }
    // const deviceObject = schemas.deviceSchema.parse(req.body.device);
    next("This API endpoint has not been implemented yet");
    return;

    const devicesObjectPath = "/devices/";
    Firebase.appendToDatabase(devicesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            // res.send(snapshot.val());
        })
        .catch(function(error) {
            next("Encountered error while adding new device: " + error);
        });
}

function getDevices(req, res, next) {
    // next("This API endpoint has not been implemented yet");
    const devicesObjectPath = "/devices/";
    // setTimeout(function() {
    Firebase.getFromDatabase(devicesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            const ListOfDevices = new DeviceList(snapshot.val());
            res.send(ListOfDevices);
        })
        .catch(function(error) {
            next("Encountered error while getting list of devices: " + error);
        });
    // }, 3500);
}

function getEpmtyDevice(req, res, next) {
    // next("This API endpoint has not been implemented yet");
    const devicesObjectPath = "/devices/";
    // setTimeout(function() {
    Firebase.getFromDatabase(devicesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            res.send(snapshot.val());
        })
        .catch(function(error) {
            next("Encountered error while getting list of devices: " + error);
        });
    // }, 3500);
}

function getDeviceTypes(req, res, next) {
    // next("This API endpoint has not been implemented yet");
    const deviceTypesObjectPath = "/deviceTypes/";
    // setTimeout(function() {
    Firebase.getFromDatabase(deviceTypesObjectPath)
        .then(function(snapshot) {
            // console.log(snapshot.val());
            res.send(snapshot.val());
        })
        .catch(function(error) {
            next(
                "Encountered error while getting list of device types: " + error
            );
        });
    // }, 3500);
}
