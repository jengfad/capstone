var sql = require("mssql");

// wtw
// var config = {
//     user: 'admin',
//     password: 'P@ssw0rd123',
//     server: 'PCM-4V2V5S2\\MSSQLSERVER01', 
//     database: 'BCI',
//     options: {
//         trustServerCertificate: true,
//         encrypt: false
//     }
// };

// omen
var config = {
    user: 'admin2',
    password: 'P@ssw0rd123',
    server: 'localhost',
    database: 'BCI',
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};


module.exports = {
    createDbRequest: async () => {
        await sql.connect(config);
        return new sql.Request();
    }

    // getAllCertificates: async () => {
    //     await sql.connect(config);
    //     const request = new sql.Request();
    //     const query = "SELECT ID as id, userID AS UserId, FileHash AS fileHash FROM dbo.Certificate";
    //     const result = await request.query(query);
    //     return result.recordset;
    // },
}