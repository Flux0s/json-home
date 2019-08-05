import { ObjectModel, ArrayModel } from "objectmodel";
import Device from "./../entities/device";

const DeviceList = new ObjectModel({
    devices: ArrayModel(Device)
});

module.exports = DeviceList;
