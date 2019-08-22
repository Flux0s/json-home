let firebase = require("./firebase-service");
// const DeviceList = require("./repositories/deviceList");

let getDevices = () => {
    const devicesObjectPath = "/devices/";
    return firebase.getFromDatabase(devicesObjectPath).then(function(snapshot) {
        // console.log(snapshot.val());
        const ListOfDevices = new DeviceRepository(snapshot.val());
        
    });
};

module.exports = {
    getDevices,
    addDevice(req, res, next) {
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
    },
    getEpmtyDevice(req, res, next) {
        // next("This API endpoint has not been implemented yet");
        const devicesObjectPath = "/devices/";
        // setTimeout(function() {
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
        // }, 3500);
    },
    getDeviceTypes(req, res, next) {
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
                    "Encountered error while getting list of device types: " +
                        error
                );
            });
        // }, 3500);
    }
};
