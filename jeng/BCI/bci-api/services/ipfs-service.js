const { create } = require("ipfs-http-client");
const axios = require("axios");
const fs = require("fs");

const client = create('https://ipfs.infura.io:5001/api/v0');

// check if file is uploaded:
// https://ipfs.infura.io/ipfs/${added.path}
// https://bafybeicashjcdau7ymwnjbjy5irb7ah64xhmqy6v7ozshfnjiq36dmihn4.ipfs.infura-ipfs.io/


module.exports = {
  addFile: async (file) => {
    const result = await client.add(file);
    return result.path;
  },

  getFile: async () => {
    const options = {
      method: "get",
      responseType: "stream"
    }
    const response = await axios.get(
      "https://bafybeicashjcdau7ymwnjbjy5irb7ah64xhmqy6v7ozshfnjiq36dmihn4.ipfs.infura-ipfs.io",
      options
    );
    response.data.pipe(
      fs.createWriteStream("office-decrypt.jpg")
    );
  }
}