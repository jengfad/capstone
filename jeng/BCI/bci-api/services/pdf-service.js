var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('cert-template.html', 'utf8');
var options = { format: 'Letter' };

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

module.exports = {
    generatePdf: async (data) => {
        const fullName = `${data.firstName} ${data.lastName}`;
        const firstDose = data.firstDose;
        const secondDose = data.secondDose;
        const age = getAge(data.birthdate.toString());
        html = html.replace('{{fullName}}', fullName)
            .replace('{{address}}', data.address)
            .replace('{{age}}', age)
            .replace('{{date1stDose}}', firstDose["dateAdministered"])
            .replace('{{brand1stDose}}', firstDose["brand"])
            .replace('{{vaccinator1stDose}}', firstDose["vaccinator"])
            .replace('{{site1stDose}}', firstDose["site"])
            .replace('{{date2ndDose}}', secondDose["dateAdministered"])
            .replace('{{brand2ndDose}}', secondDose["brand"])
            .replace('{{vaccinator2ndDose}}', secondDose["vaccinator"])
            .replace('{{site2ndDose}}', secondDose["site"])

        const filepath = `certs/patient-${data.patientId}.pdf`

        return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile(filepath, function (err, res) {
                if (err) {
                    reject();
                }

                resolve(res.filename);
            });
        });
    }
}


