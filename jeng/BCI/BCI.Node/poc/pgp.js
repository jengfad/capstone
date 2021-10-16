// generate-keys.js
const openpgp = require("openpgp");
const fs = require("fs");

async function generate() {
  return await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase: "qwerty",
  });
}

async function encrypt(publicKeyArmored) {

  const file = fs.readFileSync('vaccine-cert.pdf');
  const fileBase64 = file.toString('base64');

  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(fileBase64),
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
  });
  
  fs.writeFileSync('encrypted.txt', encrypted.data);
}

async function decrypt(privateKeyArmored, passphrase) {
  const privateKey = (await openpgp.key.readArmored([privateKeyArmored])).keys[0];
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

openpgp.config.allow_unauthenticated_stream = true;

generate().then(data => {

    encrypt(data.publicKeyArmored).then(() => {
        decrypt(data.privateKeyArmored, "qwerty");
    })
})



