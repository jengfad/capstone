const sql = require("mssql");
const dbUtil = require("../services/db-util");
const pgpService = require("../services/pgp-service");

module.exports = {
    registerPatient: async (model) => {
        const request = await dbUtil.createDbRequest();
        const fullName = `${model.firstName} ${model.lastName}`;
        const keys = await pgpService.generateKeyPair(fullName, model.email);

        request.input('FirstName', sql.NVarChar, model.firstName);
        request.input('LastName', sql.NVarChar, model.lastName);
        request.input('Email', sql.NVarChar, model.email);
        request.input('PublicKey', sql.NVarChar, keys.publicKey);
        request.input('EncryptedPrivateKey', sql.NVarChar, keys.privateKey);
        request.input('HashedPassword', sql.NVarChar, 'password123');

        const query = `
        INSERT INTO [dbo].[User]
           ([FirstName]
           ,[LastName]
           ,[Email]
           ,[PublicKey]
           ,[EncryptedPrivateKey]
           ,[HashedPassword])
        VALUES
            (@FirstName
            ,@LastName
            ,@Email
            ,@PublicKey
            ,@EncryptedPrivateKey
            ,@HashedPassword)`;
        
        const result = await request.query(query.trim());
    }
}