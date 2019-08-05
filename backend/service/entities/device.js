import { ObjectModel } from "objectmodel";

const Device = new ObjectModel({
    id: Number,
    name: String,
    location: String
});

module.exports = Device;
