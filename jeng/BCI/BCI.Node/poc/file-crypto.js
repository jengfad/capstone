const fs = require('fs');
const crypto = require("crypto");

module.exports = {
    getKeysFromFiles: () => {
        var privateKeyText = fs.readFileSync("./poc/data/private-key.txt", "utf-8");
        privateKeyText = privateKeyText.toString();
        var publicKeyText = fs.readFileSync("./poc/data/public-key.txt", "utf-8");
        publicKeyText = publicKeyText.toString();

        var privateKey = crypto.createPrivateKey({
            'key': privateKeyText,
            'format': 'pem',
            'type': 'pkcs8',
            'cipher': 'aes-256-cbc',
            'passphrase': 'passphrase'
        });

        var publicKey = crypto.createPublicKey({
            "key": publicKeyText,
            "type": "spki",
            "format": "pem"
        });

        return { privateKey: privateKey, publicKey: publicKey };
    },

    generateKeys: () =>  {
        const { publicKey, privateKey } = crypto.generateKeyPairSync(
            "rsa",
            {
                modulusLength: 2048,
                'publicKeyEncoding': {
                    'type': 'spki',
                    'format': 'pem',
                },
                'privateKeyEncoding': {
                    'type': 'pkcs8',
                    'format': 'pem',
                    'cipher': 'aes-256-cbc',
                    'passphrase': 'passphrase'
                }
            }
        );

        fs.writeFileSync("./poc/data/public-key.txt", publicKey);
        fs.writeFileSync("./poc/data/private-key.txt", privateKey);
    },

    encryptFile: (publicKey) => {
        var fileToEncrypt = fs.readFileSync('./poc/data/vaccine-cert.pdf');
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS8_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(fileToEncrypt)
        );
        fs.writeFileSync('./poc/data/encrypted.pdf', encryptedData);
    },

    decryptFile: (privateKey) => {
        var fileToDecrypt = fs.readFileSync('./poc/data/encrypted.pdf');
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS8_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(fileToDecrypt)
        );
        fs.writeFileSync('./poc/data/dummy.txt.dec', decryptedData);
    }
}