const express = require("express");
const fileUpload = require('express-fileupload');
const pgpService = require("../services/pgp-service");
const ipfsService = require("../services/ipfs-service");
const userService = require("../services/user-service");
const certService = require("../services/cert-service");
const pdfService = require("../services/pdf-service");
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
  // const cid = await ipfsService.addFile(encryptedFile); // actual
  const cid = "bafybeiegpugl5bzoo3ybaj4vmlqltzvrw4tsuf6mnwkvllu7j5zo6k3jzu"; // debug
  const fileHash = pgpService.getFileHash(file);
  await certService.insertCert(userId, fileHash, cid);
  res.send(cid);
})

app.post('/api/search-users', async (req, res, next) => {
  console.log(req);
  const searchText = req.body.searchText;
  const users = await userService.searchUsers(searchText);
  res.send(users);
})

app.get('/api/patient/:id', async (req, res, next) => {
  const userId = req.params.id;
  const patient = await userService.getPatient(userId);
  res.send(patient);
})

app.post('/api/view-cert', async (req, res, next) => {
  const userId = req.body.userId;
  const cid = req.body.cid;
  const encryptedFile = await ipfsService.getFile(cid);
  const keys = await userService.getUserKeys(userId);
  const decryptedFileBase64 = await pgpService.decryptFile(encryptedFile, keys.EncryptedPrivateKey);
  const data = {
    base64: decryptedFileBase64.toString()
  }
  res.send(JSON.stringify(data));
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

app.get('/api/generate-pdf', async (req, res, next) => {
  await pdfService.generatePdf();
  res.send("success");
});

app.post('/api/create-vaccine-record', async (req, res, next) => { 
  const userId = req.body.userId;
  const vaxDetails = req.body.vaxDetails;
  // await pdfService.generatePdf(vaxDetails);
  const result = {
    fileHash: 'someguid123'
  }
  res.send(result)
});