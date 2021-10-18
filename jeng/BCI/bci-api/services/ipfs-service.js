const { create } = require("ipfs-http-client");
const fs = require("fs");

const client = create('https://ipfs.infura.io:5001/api/v0')

// check if file is uploaded:
// https://ipfs.infura.io/ipfs/${added.path}

module.exports = {
  addFile: async () => {
    const file = fs.readFileSync('office.jpg');
    const cid = await client.add(file);
    return cid;
  }
}