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
const qrcode = require('qrcode');
const qrOption = {
  width : 250
};

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

  if (certRecord == null) {
    res.send(false);
    return;
  }

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

  if (record == null) {
    res.send(false);
    return;
  }
  
  res.send(record);
})

app.get('/api/summary/:summaryHash', async(req, res, next) => {
  const summaryHash = req.params.summaryHash;
  const record = await certService.getSummaryByHash(summaryHash);
  res.send(record);
})

app.post('/api/register-patient', async (req, res, next) => {
  const result = await userService.registerPatient(req.body);
  res.send("success");
});

app.post('/api/login', async (req, res, next) => {
  const result = await userService.getUserByEmailPassword(
    req.body.email,
    req.body.password,
    req.body.roleId
  );
  res.send(result);
});

app.post('/api/cert/get-hash', async (req, res, next) => {
  let file = req.files.file.data;
  const fileHash = pgpService.getFileBufferHash(file);
  console.log('filehash', fileHash);
  res.send({fileHash: fileHash});
  // console.log('validate certificate')

  // // TODO - validate against blockchain
  // const record = await certService.getSummaryByFileHash(fileHash);
  // const isValid = !!record && record !== null;
  // res.send(isValid);
});

app.get('/api/delete-cert/:userid', async (req, res, next) => {
  const deleteCert = await certService.deleteCertificate(req.params.userid);
  res.send('delete done')
})

app.get('/api/generate-qr', async (req, res, next) => {
  const qrString = 'b171c8dfa1758bc9136e7a33d241a5068a5ba6fc68b99c09126a31939e8bee6f';
  const bufferImage = await qrcode.toDataURL(qrString,qrOption);

  const base64 = bufferImage.toString('base64');
  console.log(base64);
});

app.post('/api/create-vaccine-record', async (req, res, next) => {
  const details = req.body;

  await certService.deleteCertificate(details.patientId);
  const certFilePath = await pdfService.generatePdf(req.body);
  const fileBuffer = fs.readFileSync(certFilePath);

  const summary = JSON.stringify(details.doses);
  const summaryHash = pgpService.getStringHash(summary);
  const fileHash = pgpService.getFileBufferHash(fileBuffer);

  // encrypt
  const keys = await userService.getUserKeys(details.patientId);
  const encryptedFilepath = await pgpService.encryptFile(fileBuffer, keys.PublicKey);
  const encryptedFileBuffer = fs.readFileSync(encryptedFilepath);

  const cid = await ipfsService.addFile(encryptedFileBuffer); // actual
  const userId = details.patientId;

  await certService.insertCert(userId, fileHash, cid, summary, summaryHash);

  const result = {
    fileHash: fileHash,
    summaryHash: summaryHash
  };

  res.send(result)
});

app.get('/testqr', (req, res) => {
  const qrString = 'b171c8dfa1758bc9136e7a33d241a5068a5ba6fc68b99c09126a31939e8bee6f';
  qrcode.toDataURL(qrString, qrOption).then(url => {
      res.send(`
      <h2>QRCode Generated</h2>
      <div><img src='${url}'/></div>
    `)
  }).catch(err => {
      console.debug(err)
  })
});