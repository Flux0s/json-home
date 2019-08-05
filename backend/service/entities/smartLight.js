import Device from "./device";

const SmartLight = new Device.extend({
    color: String,
    on: Boolean,
    pattern: String
});

module.exports = SmartLight;
