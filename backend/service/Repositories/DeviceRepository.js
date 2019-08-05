const schema = require("schm");
const deviceEntity = require("../Entities/DeviceEntity");

module.exports = DeviceRepository = schema({
    devices: [deviceEntity]
});
