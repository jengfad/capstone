var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('cert-template.html', 'utf8');
var options = { format: 'Letter' };

module.exports = {
    generatePdf: async () => {
        const model = {
            fullName: 'John Doe',
            address: '123 Goldberg St. Madre Linda Subdivision',
            age: '25'
        };

        html = html.replace('{{fullName}}', model.fullName)
            .replace('{{address}}', model.address)
            .replace('{{age}}', model.age);

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


