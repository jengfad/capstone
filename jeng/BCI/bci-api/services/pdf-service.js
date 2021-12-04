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
        let html = fs.readFileSync('cert-template.html', 'utf8');
        const dateToday = new Date();
        const fullName = `${data.firstName} ${data.lastName}`;
        const dose1 = data.doses.dose1;
        const dose2 = data.doses.dose2;
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
            .replace(/{{dateDose1}}/g, getFormattedDate(dose1["dateAdministered"]))
            .replace(/{{brandDose1}}/g, dose1["brand"])
            .replace(/{{vaccinatorDose1}}/g, dose1["vaccinator"])
            .replace(/{{siteDose1}}/g, dose1["site"])
            .replace(/{{dateDose2}}/g, getFormattedDate(dose2["dateAdministered"]))
            .replace(/{{brandDose2}}/g, dose2["brand"])
            .replace(/{{vaccinatorDose2}}/g, dose2["vaccinator"])
            .replace(/{{siteDose2}}/g, dose2["site"]);

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


