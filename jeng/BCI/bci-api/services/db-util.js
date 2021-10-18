var sql = require("mssql");

var config = {
    user: 'admin',
    password: 'P@ssw0rd123',
    server: 'PCM-4V2V5S2\\MSSQLSERVER01', 
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

    // addPatient: async (userModel, publicKey, ) => {
    //     await sql.connect(config);
    //     const request = new sql.Request();
    //     request.input('firstName', sql.VarChar, model.firstName);
    //     request.input('lastName', sql.VarChar, model.lastName);
    //     request.input('email', sql.VarChar, model.email);
    //     request.input('publicKey', sql.VarChar, model.firstName);
    // }
}