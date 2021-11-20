const sql = require("mssql");
const dbUtil = require("../services/db-util");

module.exports = {
    insertCert: async (userId, fileHash, cid, summary) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserID', sql.Int, userId);
        request.input('FileHash', sql.NVarChar, fileHash);
        request.input('CID', sql.NVarChar, cid);
        request.input('Summary', sql.NVarChar, summary);

        const query = `
        INSERT INTO [dbo].[Certificate]
           ([UserID]
           ,[FileHash]
           ,[CID]
           ,[Summary])
        VALUES
            (@UserID
            ,@FileHash
            ,@CID
            ,@Summary)`;
        
        await request.query(query.trim());
    },

    deleteCertificate: async (userId) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserId', sql.Int, userId);
        const query = `DELETE FROM [dbo].[Certificate] WHERE UserID = @UserId`;
        const result = await request.query(query.trim());
        return true;
    },

    getCertificateByUserId: async (userId) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserId', sql.Int, userId);
        const query = `SELECT * FROM [dbo].[Certificate] WHERE UserID = @UserId`;
        const result = await request.query(query.trim());
        return result.recordset[0];
    },

    getSummaryByFileHash: async (fileHash) => {
        const request = await dbUtil.createDbRequest();
        request.input('FileHash', sql.NVarChar, fileHash);
        const query = `
            SELECT	u.[FirstName]
                    ,u.[LastName]
                    ,u.[Address]
                    ,c.[Summary]
            FROM dbo.[User] u
            INNER JOIN dbo.[Certificate] c
                ON c.UserID = u.ID
            WHERE c.FileHash = @FileHash
        `;
        const result = await request.query(query.trim());
        return result.recordset[0];
    },

    getSummaryByUserId: async (userId) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserId', sql.Int, userId);
        const query = `
            SELECT	u.[FirstName]
                    ,u.[LastName]
                    ,u.[Address]
                    ,c.[Summary]
            FROM dbo.[User] u
            INNER JOIN dbo.[Certificate] c
                ON c.UserID = u.ID
            WHERE u.ID = @UserId
        `;
        const result = await request.query(query.trim());
        return result.recordset[0];
    }
}