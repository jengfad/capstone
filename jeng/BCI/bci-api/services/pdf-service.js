var fs = require('fs');
var pdf = require('html-pdf');
var options = { format: 'Letter' };
const qrcode = require('qrcode');
const imageSrcService = require('./image-src-service');
const qrOption = {
  width : 200,
  margin: 0
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getFormattedDate(dateString) {
    var dt = new Date(dateString);
    return `${dt.toLocaleString('default', {month: 'short'})} ${dt.getDate()}, ${dt.getFullYear()}`;
}

function getDateToday() {
    var dt = new Date();
    return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`
}

module.exports = {
    generatePdf: async (data) => {
        let html = fs.readFileSync('templates/cert-template.html', 'utf8');
        const dateToday = new Date();
        const fullName = `${data.firstName} ${data.lastName}`;
        const age = getAge(data.birthdate.toString());
        const birthdate = getFormattedDate(data.birthdate);
        const qrCode = await qrcode.toDataURL(data.patientId.toString(), qrOption)
        const dateNow = getFormattedDate(dateToday.toString());
        html = html.replace(/{{qrCode}}/g, qrCode)
            .replace(/{{officerSignature}}/g, imageSrcService.getOfficerSignature())
            .replace(/{{phLogo}}/g, imageSrcService.getPhLogo())
            .replace(/{{fullName}}/g, fullName)
            .replace(/{{dateGenerated}}/g, dateNow)
            .replace(/{{address}}/g, data.address)
            .replace(/{{birthdate}}/g, birthdate)
            .replace(/{{age}}/g, age)

        let rows = "";
        for (let key in data.doses) {
            let dose = data.doses[key];
            let row = fs.readFileSync('templates/dose-template.html', 'utf8');
            row = row.replace(/{{dateAdministered}}/g, getFormattedDate(dose["dateAdministered"]))
                .replace(/{{doseNumber}}/g, key.replace("dose", ""))
                .replace(/{{brand}}/g, dose["brand"])
                .replace(/{{vaccinator}}/g, dose["vaccinator"])
                .replace(/{{site}}/g, dose["site"]);
            rows = rows + row;
        }
        
        html = html.replace(/{{doseRows}}/g, rows);

        const filepath = `certs/patient-${data.patientId}.pdf`

        return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile(filepath, function (err, res) {
                if (err) {
                    reject();
                }

                resolve(res.filename);
            });
        });
    },

    
}


