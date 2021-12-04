var fs = require('fs');
var pdf = require('html-pdf');
const srcService = require("./image-src-service");
var options = { format: 'Letter' };
const qrcode = require('qrcode');
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
    return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`
}

function getDateToday() {
    var dt = new Date();
    return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`
}

module.exports = {
    generatePdf: async (data) => {
        let html = fs.readFileSync('cert-template.html', 'utf8');
        const fullName = `${data.firstName} ${data.lastName}`;
        const firstDose = data.firstDose;
        const secondDose = data.secondDose;
        const age = getAge(data.birthdate.toString());
        const birthdate = getFormattedDate(data.birthdate);
        const qrCode = await qrcode.toDataURL(data.patientId.toString(), qrOption)
        const phLogo = srcService.getPhLogo();
        const dateNow = getDateToday();
        html = html.replace('{{qrCode}}', qrCode)
            .replace('{{phLogo}}', phLogo)
            .replace('{{fullName}}', fullName)
            .replace('{{dateGenerated}}', dateNow)
            .replace('{{address}}', data.address)
            .replace('{{birthdate}}', birthdate)
            .replace('{{age}}', age)
            .replace('{{date1stDose}}', firstDose["dateAdministered"])
            .replace('{{brand1stDose}}', firstDose["brand"])
            .replace('{{vaccinator1stDose}}', firstDose["vaccinator"])
            .replace('{{site1stDose}}', firstDose["site"])
            .replace('{{date2ndDose}}', secondDose["dateAdministered"])
            .replace('{{brand2ndDose}}', secondDose["brand"])
            .replace('{{vaccinator2ndDose}}', secondDose["vaccinator"])
            .replace('{{site2ndDose}}', secondDose["site"]);

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


