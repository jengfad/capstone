const express = require("express");
const db = require("../db/index");
const fileUpload = require('express-fileupload');
const certService = require("../services/certificate-service")
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
  await certService.generateStaticKeyPair();
  res.send("keys generated");
})

app.post('/upload', async (req, res, next) => {
  let file = req.files.file.data;
  const keys = certService.getStaticKeys();
  await certService.encryptFile(file, keys.publicKey);
  res.send("success");
})

app.get('/download', async (req, res, next) => {
  const keys = certService.getStaticKeys();
  await certService.decryptFile(keys.privateKey, "qwerty");
  res.send("success");
})