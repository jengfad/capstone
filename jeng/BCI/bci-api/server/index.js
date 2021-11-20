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

app.get("/certificates", async (req, res) => {
  const result = await db.getAllCertificates();
  res.send(result);
})

app.get("/generate-key", async (req, res) => {
  await pgpService.generateStaticKeyPair();
  res.send("keys generated");
})

app.get('/api/patient/:id', async (req, res, next) => {
  const userId = req.params.id;
  const patient = await userService.getPatient(userId);
  res.send(patient);
})

app.get('/api/cert/patient/:patientId', async (req, res, next) => {
  const userId = req.params.patientId;
  const certRecord = await certService.getCertificateByUserId(userId);
  const cid = certRecord.CID;
  
  const encryptedFile = await ipfsService.getFile(cid);
  const keys = await userService.getUserKeys(userId);
  const decryptedFileBase64 = await pgpService.decryptFile(encryptedFile, keys.EncryptedPrivateKey);

  const data = {
    base64: decryptedFileBase64.toString(),
    fileHash: certRecord.FileHash
  }
  res.send(JSON.stringify(data));
})

app.get('/api/summary/patient/:patientId', async(req, res, next) => {
  const userId = req.params.patientId;
  const record = await certService.getSummaryByUserId(userId);
  res.send(record);
})

app.get('/api/summary/filehash/:filehash', async(req, res, next) => {
  const filehash = req.params.filehash;
  const record = await certService.getSummaryByFileHash(filehash);
  res.send(record);
})

app.post('/api/register-patient', async (req, res, next) => {
  const result = await userService.registerPatient(req.body);
  res.send("success");
});

app.post('/api/cert/validate', async (req, res, next) => {
  let file = req.files.file.data;
  const fileHash = pgpService.getFileBufferHash(file);

  // TODO - validate against blockchain
  const record = await certService.getSummaryByFileHash(fileHash);
  const isValid = !!record && record !== null;
  res.send(isValid);
});

app.get('/api/delete-cert/:userid', async (req, res, next) => {
  const deleteCert = await certService.deleteCertificate(req.params.userid);
  res.send('delete done')
})

app.post('/api/create-vaccine-record', async (req, res, next) => {
  const details = req.body;
  const deleteCert = await certService.deleteCertificate(details.patientId);
  const certFilePath = await pdfService.generatePdf(req.body);
  const fileBuffer = fs.readFileSync(certFilePath);

  const summary = JSON.stringify({
    firstDose: details.firstDose["dateAdministered"],
    secondDose: details.secondDose["dateAdministered"]
  });

  const fileHash = pgpService.getFileBufferHash(fileBuffer);

  // encrypt
  const keys = await userService.getUserKeys(details.patientId);
  const encryptedFilepath = await pgpService.encryptFile(fileBuffer, keys.PublicKey);
  const encryptedFileBuffer = fs.readFileSync(encryptedFilepath);

  const cid = await ipfsService.addFile(encryptedFileBuffer); // actual
  const userId = details.patientId;

  await certService.insertCert(userId, fileHash, cid, summary);

  const result = {
    fileHash: fileHash
  };

  res.send(result)
});