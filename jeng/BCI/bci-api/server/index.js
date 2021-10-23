const express = require("express");
const fileUpload = require('express-fileupload');
const pgpService = require("../services/pgp-service");
const ipfsService = require("../services/ipfs-service");
const userService = require("../services/user-service");
const fs = require("fs");
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
  const userId = req.body.userId;
  const keys = await userService.getUserKeys(userId);
  await pgpService.encryptFile(file, keys.PublicKey);
  const encryptedFile = fs.readFileSync("encrypted.txt");
  const ipfsFile = await ipfsService.addFile(encryptedFile);
  console.log('cid v1', ipfsFile.cid.toV1());
  res.send("success");
})

app.get('/download', async (req, res, next) => {
  const userId = req.body.userId;
  const cid = req.body.cid;
  // const cid = 'bafybeibr5fo56qf665aa5qkep2m5czqxctowb5g7ycm6l2xjrztig5qiw4';
  const file = await ipfsService.getFile(cid);
  const keys = await userService.getUserKeys(userId);
  await pgpService.decryptFile(file, keys.EncryptedPrivateKey);
  res.send("success");
})

app.get('/add-file', async (req, res, next) => {
  const file = fs.readFileSync("office.jpg");
  const addedFile = await ipfsService.addFile(file);
  res.send("success");
})

app.post('/register-patient', async (req, res, next) => {
  const result = await userService.registerPatient(req.body);
  res.send("success");
})