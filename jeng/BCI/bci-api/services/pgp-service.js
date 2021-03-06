const openpgp = require("openpgp");
const fs = require("fs");
const crypto = require('crypto');

const passphrase = "passphrase123";
const curve = "ed25519";

module.exports = {
    getStringHash: (text) => {
        const hashSum = crypto.createHash('sha256');
        hashSum.update(text);
        return hashSum.digest('hex');
    },

    getFileHash: (filepath) => {
        const fileBuffer = fs.readFileSync(filepath);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        return hashSum.digest('hex');
    },

    getFileBufferHash: (fileBuffer) => {
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        return hashSum.digest('hex');
    },

    generateKeyPair: async (name, email) => {
        const keys = await openpgp.generateKey({
            userIds: [{ name: name, email: email }],
            curve: curve,
            passphrase: passphrase,
        });

        return {
            privateKey: keys.privateKeyArmored,
            publicKey: keys.publicKeyArmored
        }
    },

    generateStaticKeyPair: async () => {
        const keys = await openpgp.generateKey({
            userIds: [{ name: "person", email: "person@somebody.com" }],
            curve: "ed25519",
            passphrase: "qwerty",
        });
        
        fs.writeFileSync('private-key.txt', keys.privateKeyArmored);
        fs.writeFileSync('public-key.txt', keys.publicKeyArmored);
        
        const privateKey = fs.readFileSync('private-key.txt');
        console.log(privateKey.toString());
    },

    getStaticKeys: () => {
        const privateKey = fs.readFileSync('private-key.txt');
        const publicKey = fs.readFileSync('public-key.txt');

        return {
            privateKey: privateKey.toString(),
            publicKey: publicKey.toString()
        }
    },

    encryptFile: async (file, publicKey) => {
        const filepath = 'encrypted.txt'
        const fileBase64 = file.toString('base64');
        const encrypted = await openpgp.encrypt({
            message: openpgp.message.fromText(fileBase64),
            publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
        });

        fs.writeFileSync(filepath, encrypted.data);
        return filepath;
    },

    decryptFile: async (file, privateKeyValue) => {
        const privateKey = (await openpgp.key.readArmored([privateKeyValue])).keys[0];
        await privateKey.decrypt(passphrase);

        const decrypted = await openpgp.decrypt({
            message: await openpgp.message.readArmored(file),
            privateKeys: [privateKey],
        });

        return decrypted.data;
        // from base64 to binary
        return Buffer.from(decrypted.data, 'base64');
    }
}