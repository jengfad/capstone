const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "/../src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8640 ,
      network_id: "14333", // Match any network id
      websockets: false
    }
  }
};
