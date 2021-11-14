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
        
        await request.query(query.trim());
    },

    searchUsers: async (searchText) => {
        const request = await dbUtil.createDbRequest();
        console.log('searchText', searchText);
        request.input('SearchText', sql.NVarChar, searchText);
        const query = `SELECT ID, LastName, FirstName, Email FROM [dbo].[User] 
            WHERE FirstName LIKE '%' + @SearchText + '%'
            OR LastName LIKE '%' + @SearchText + '%'
            OR Email LIKE '%' + @SearchText + '%'`;
        const result = await request.query(query.trim());
        return result.recordset;
    },

    getUserKeys: async (userId) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserId', sql.Int, userId);
        const query = `SELECT PublicKey, EncryptedPrivateKey FROM [dbo].[User] WHERE ID = @UserId`;
        const result = await request.query(query.trim());
        const keys = result.recordset[0];
        return keys;
    },
    
    getPatient: async (userId) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserId', sql.Int, userId);
        const query = `SELECT ID, FirstName, LastName, Email FROM [dbo].[User] WHERE ID = @UserId`;
        const result = await request.query(query.trim());
        return result.recordset[0];
    }
}