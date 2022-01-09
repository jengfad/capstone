CREATE TABLE [dbo].[Certificate](
    [ID] [int] IDENTITY(1,1) NOT NULL,
    [UserID] [int] NOT NULL,
    [Summary] [nvarchar](MAX) NULL,
    [SummaryHash] [nvarchar](MAX) NULL,
    [FileHash] [nvarchar](MAX) NULL,
    [CID] [nvarchar](MAX) NULL,
 CONSTRAINT [PK_Certificate] PRIMARY KEY CLUSTERED 
(
    [ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
) ON [PRIMARY]

CREATE TABLE [dbo].[User](
    [ID] [int] IDENTITY(1,1) NOT NULL,
    FirstName [nvarchar](MAX) NULL,
    LastName [nvarchar](MAX) NULL,
    Email [nvarchar](MAX) NULL,
    [Address] [nvarchar](MAX) NULL,
    Birthdate DATETIME NULL,
    PublicKey [nvarchar](MAX) NULL,
    EncryptedPrivateKey [nvarchar](MAX) NULL,
    RoleID INT NULL,
    HashedPassword [nvarchar](MAX) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
    [ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
) ON [PRIMARY]