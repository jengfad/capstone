var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('cert-template.html', 'utf8');
var options = { format: 'Letter' };

module.exports = {
    generatePdf: async (vaxDetails) => {
        const model = {
            fullName: 'John Doe',
            address: '123 Goldberg St. Madre Linda Subdivision',
            age: '25'
        };
        html = html.replace('{{fullName}}', model.fullName)
            .replace('{{address}}', model.address)
            .replace('{{age}}', model.age)
            .replace('{{date1stDose}}', vaxDetails["firstDose"]["dateAdministered"])
            .replace('{{brand1stDose}}', vaxDetails["firstDose"]["brand"])
            .replace('{{vaccinator1stDose}}', vaxDetails["firstDose"]["vaccinator"])
            .replace('{{site1stDose}}', vaxDetails["firstDose"]["site"])
            .replace('{{date2ndDose}}', vaxDetails["secondDose"]["dateAdministered"])
            .replace('{{brand2ndDose}}', vaxDetails["secondDose"]["brand"])
            .replace('{{vaccinator2ndDose}}', vaxDetails["secondDose"]["vaccinator"])
            .replace('{{site2ndDose}}', vaxDetails["secondDose"]["site"])

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


