const fc = require("./poc/file-crypto");

fc.generateKeys();
const { privateKey, publicKey } = fc.getKeysFromFiles();
fc.encryptFile(publicKey);
fc.decryptFile(privateKey);