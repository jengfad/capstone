var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('cert-template.html', 'utf8');
var options = { format: 'Letter' };

module.exports = {
    generatePdf: async (data) => {
        console.log('the data', data);
        const fullName = `${data.firstName} ${data.lastName}`;
        const firstDose = data.firstDose;
        const secondDose = data.secondDose;
        html = html.replace('{{fullName}}', fullName)
            // .replace('{{address}}', model.address)
            // .replace('{{age}}', model.age)
            .replace('{{date1stDose}}', firstDose["dateAdministered"])
            .replace('{{brand1stDose}}', firstDose["brand"])
            .replace('{{vaccinator1stDose}}', firstDose["vaccinator"])
            .replace('{{site1stDose}}', firstDose["site"])
            .replace('{{date2ndDose}}', secondDose["dateAdministered"])
            .replace('{{brand2ndDose}}', secondDose["brand"])
            .replace('{{vaccinator2ndDose}}', secondDose["vaccinator"])
            .replace('{{site2ndDose}}', secondDose["site"])

        return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile('cert-sample.pdf', function (err, res) {
                if (err) {
                    reject();
                }
                resolve();
            });
        });
    }
}


