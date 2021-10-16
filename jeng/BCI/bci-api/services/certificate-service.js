const openpgp = require("openpgp");
const fs = require("fs");

module.exports = {
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
        const fileBase64 = file.toString('base64');
        const encrypted = await openpgp.encrypt({
            message: openpgp.message.fromText(fileBase64),
            publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
        });

        fs.writeFileSync('encrypted.txt', encrypted.data);
    },

    decryptFile: async (privateKeyValue, passphrase) => {
        const privateKey = (await openpgp.key.readArmored([privateKeyValue])).keys[0];
        await privateKey.decrypt(passphrase);

        const file = fs.readFileSync("encrypted.txt");
        const decrypted = await openpgp.decrypt({
            message: await openpgp.message.readArmored(file),
            privateKeys: [privateKey],
        });

        // from base64 to binary
        let buff = Buffer.from(decrypted.data, 'base64');
        fs.writeFileSync('decrypted.pdf', buff);
    }
}