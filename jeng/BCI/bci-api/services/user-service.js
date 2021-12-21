const sql = require("mssql");
const dbUtil = require("../services/db-util");
const pgpService = require("../services/pgp-service");

module.exports = {
    registerPatient: async (model) => {
        const request = await dbUtil.createDbRequest();
        const fullName = `${model.firstName} ${model.lastName}`;
        const keys = await pgpService.generateKeyPair(fullName, model.email);
        const hashedPassword = pgpService.getStringHash(model.password);

        request.input('FirstName', sql.NVarChar, model.firstName);
        request.input('LastName', sql.NVarChar, model.lastName);
        request.input('Email', sql.NVarChar, model.email);
        request.input('Address', sql.NVarChar, model.address);
        request.input('Birthdate', sql.NVarChar, model.birthdate);
        request.input('PublicKey', sql.NVarChar, keys.publicKey);
        request.input('EncryptedPrivateKey', sql.NVarChar, keys.privateKey);
        request.input('HashedPassword', sql.NVarChar, hashedPassword);

        const query = `
        INSERT INTO [dbo].[User]
           ([FirstName]
           ,[LastName]
           ,[Email]
           ,[Address]
           ,[Birthdate]
           ,[PublicKey]
           ,[EncryptedPrivateKey]
           ,[RoleID]
           ,[HashedPassword])
        VALUES
            (@FirstName
            ,@LastName
            ,@Email
            ,@Address
            ,@Birthdate
            ,@PublicKey
            ,@EncryptedPrivateKey
            ,1
            ,@HashedPassword)`;
        
        await request.query(query.trim());
    },

    getUserByEmailPassword: async (email, password, roleId) => {
        const request = await dbUtil.createDbRequest();
        const hashedPassword = pgpService.getStringHash(password);
        request.input('Email', sql.NVarChar, email);
        request.input('Password', sql.NVarChar, hashedPassword);
        request.input('RoleID', sql.Int, roleId);

        console.log(`${email} - ${hashedPassword} - ${roleId}`);

        const query = `
            SELECT	u.[ID]
                    ,u.[FirstName]
                    ,u.[LastName]
            FROM dbo.[User] u
            WHERE u.Email = @Email
            AND u.HashedPassword = @Password
            AND u.RoleID = @RoleID
        `;
        const result = await request.query(query.trim());
        console.log(result.recordset[0])
        return result.recordset[0];
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
        const query = `SELECT ID, FirstName, LastName, Email, Address, Birthdate FROM [dbo].[User] WHERE ID = @UserId`;
        const result = await request.query(query.trim());
        return result.recordset[0];
    }
}