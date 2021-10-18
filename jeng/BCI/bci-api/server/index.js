const express = require("express");
const fileUpload = require('express-fileupload');
const pgpService = require("../services/pgp-service");
const ipfsService = require("../services/ipfs-service");
const userService = require("../services/user-service");
const PORT = process.env.PORT || 7777;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/certificates", async (req, res) => {
  const result = await db.getAllCertificates();
  res.send(result);
})

app.get("/generate-key", async (req, res) => {
  await pgpService.generateStaticKeyPair();
  res.send("keys generated");
})

app.post('/upload', async (req, res, next) => {
  let file = req.files.file.data;
  const keys = pgpService.getStaticKeys();
  await pgpService.encryptFile(file, keys.publicKey);
  res.send("success");
})

app.get('/download', async (req, res, next) => {
  const keys = pgpService.getStaticKeys();
  await pgpService.decryptFile(keys.privateKey, "qwerty");
  res.send("success");
})

app.get('/add-file', async (req, res, next) => {
  const addedFile = await ipfsService.addFile();
  res.send("success");
})

app.post('/register-patient', async (req, res, next) => {
  const result = await userService.registerPatient(req.body);
  res.send("success");
})