const express = require("express");
const fs = require('fs');
const crypto = require("crypto");

const PORT = process.env.PORT || 7777;
let app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

function readStreamToBuffer (fileStream) {
    const bufferTask = new Promise((resolve, reject) => {
        let chunks = [];
        let fileBuffer;

        fileStream.once('error', (err) => {
            console.error(err);
            reject(err);
        });

        fileStream.once('end', () => {
            fileBuffer = Buffer.concat(chunks);
            resolve(fileBuffer);
        });

        fileStream.on('data', (chunk) => {
            chunks.push(chunk); // push data chunk to array
        });
    });

    return bufferTask;
}

async function uploadFile() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });
    var input = fs.createReadStream('dummy.txt');
    var output = fs.createWriteStream('dummy.txt.enc');
    var buffer = await readStreamToBuffer(input);

    // const encryptedData = crypto.publicEncrypt(
    //     {
    //         key: publicKey,
    //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //         oaepHash: "sha256",
    //     },
    //     Buffer.from(buffer)
    // );

    // encryptedData.pipe(output);
}

app.get("/api/upload", (req, res) => {
    uploadFile();
});

app.use(
    express.urlencoded({ extended: true }),
    express.json()
)