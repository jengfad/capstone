const sql = require("mssql");
const dbUtil = require("../services/db-util");

module.exports = {
    insertCert: async (userId, fileHash, cid) => {
        const request = await dbUtil.createDbRequest();
        request.input('UserID', sql.Int, userId);
        request.input('FileHash', sql.NVarChar, fileHash);
        request.input('CID', sql.NVarChar, cid);

        const query = `
        INSERT INTO [dbo].[Certificate]
           ([UserID]
           ,[FileHash]
           ,[CID])
        VALUES
            (@UserID
            ,@FileHash
            ,@CID)`;
        
        await request.query(query.trim());
    }
}