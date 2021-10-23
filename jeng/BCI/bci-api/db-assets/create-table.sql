CREATE TABLE [dbo].[History](
    [ID] [int] IDENTITY(1,1) NOT NULL,
    [RequestID] [int] NOT NULL,
    [EmployeeID] [varchar](50) NOT NULL,
    [DateStamp] [datetime] NOT NULL,
 CONSTRAINT [PK_History] PRIMARY KEY CLUSTERED 
(
    [ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
) ON [PRIMARY]