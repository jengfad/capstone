const { create } = require("ipfs-http-client");
const axios = require("axios");

const client = create('https://ipfs.infura.io:5001/api/v0');

// check if file is uploaded:
// https://ipfs.infura.io/ipfs/${added.path}
// https://bafybeicashjcdau7ymwnjbjy5irb7ah64xhmqy6v7ozshfnjiq36dmihn4.ipfs.infura-ipfs.io/

const stream2buffer = (stream) => {
  return new Promise((resolve, reject) => {
      const _buf = [];
      stream.on("data", (chunk) => _buf.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(_buf)));
      stream.on("error", (err) => reject(err));
  });
} 

module.exports = {
  addFile: async (file) => {
    const result = await client.add(file);
    return result;
  },

  getFile: async (cid) => {
    const options = {
      method: "get",
      responseType: "stream"
    };

    const url = `https://${cid}.ipfs.infura-ipfs.io`;
    const response = await axios.get(
      url,
      options
    );

    return stream2buffer(response.data);
  }
}