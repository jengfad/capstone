const { create } = require("ipfs-http-client");

const client = create('https://ipfs.infura.io:5001/api/v0');

// check if file is uploaded:
// https://ipfs.infura.io/ipfs/${added.path}

module.exports = {
  addFile: async (file) => {
    const result = await client.add(file);
    return result.path;
  },

  getFile: async (cid) => {
    const result = await client.get('bafybeibekkxkexvbw65ma4syafzfnxtumfx7wjkbtaf2zfsoypmshn6ccu');
    console.log('result', result);
    result.foreach(file => {
      console.log('file: ', file)
    })
    return result;
  }
}