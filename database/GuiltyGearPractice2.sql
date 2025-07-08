CREATE DATABASE GUILTYGEARPRACTICE2
USE GUILTYGEARPRACTICE2


CREATE TABLE GuiltyGear_Product(
	ProductID INT NOT NULL IDENTITY (1,1), 
	OrderID NVARCHAR(10) NOT NULL, --ID user
	Platform NVARCHAR(30) NOT NULL,
	Price DECIMAL(10, 2) NOT NULL,
	Type NVARCHAR(30) NOT NULL, --Digital or physical
	Edition NVARCHAR(50) NOT NULL DEFAULT 'N/A', 
	ProductName NVARCHAR(50) NOT NULL,
	Stock INT NOT NULL DEFAULT 0,
	ELIMINADO NVARCHAR(3) DEFAULT 'NO'
)
ALTER TABLE GuiltyGear_Product ADD CONSTRAINT PK_ProductID PRIMARY KEY (ProductID);


CREATE TABLE GuiltyGear_User(
	UserID NVARCHAR(10) NOT NULL, 
	Name NVARCHAR(40) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	Email NVARCHAR(80) NOT NULL,
	Password NVARCHAR(20) NOT NULL,
	Phone NVARCHAR(10) NOT NULL DEFAULT 'N/A',
	ELIMINADO NVARCHAR(3) DEFAULT 'NO'
)
ALTER TABLE GuiltyGear_User ADD CONSTRAINT PK_UserID PRIMARY KEY (UserID);
Alter TABLE GuiltyGear_USER ADD CONSTRAINT UQ_Email UNIQUE (Email);
Alter TABLE GuiltyGear_USER ADD CONSTRAINT UQ_Phone UNIQUE (Phone);
ALTER TABLE GuiltyGear_User ALTER COLUMN Password NVARCHAR(100) NOT NULL;




CREATE TABLE GuiltyGear_Orders(
	PurchaseID INT NOT NULL IDENTITY(1,1),
	UserID NVARCHAR(10) NOT NULL, 
	ProductID INT NOT NULL, 
	ProductName NVARCHAR(40) NOT NULL,
	Purchase_Price DECIMAL(10, 2) NOT NULL,
	ELIMINADO NVARCHAR(3) DEFAULT 'NO',
	Status NVARCHAR(20) DEFAULT 'PENDING',
	CONSTRAINT PK_PurchaseID PRIMARY KEY (PurchaseID)
)
ALTER TABLE GuiltyGear_Orders ADD CONSTRAINT FK_UserID FOREIGN KEY (UserID) References GuiltyGear_User (UserID);
ALTER TABLE GuiltyGear_Orders ADD CONSTRAINT FK_ProductID FOREIGN KEY (ProductID) REFERENCES GuiltyGear_Product (ProductID);
ALTER TABLE GuiltyGear_Orders ADD Purchase_Date DATETIME NOT NULL DEFAULT GETDATE();





GO



--Adding data
-- Season Pass 1 to 4 (Digital Add-on)
-- ===========================
-- Stored Procedures para Dropdowns
-- ===========================

CREATE OR ALTER PROCEDURE DBO.IsEliminado
AS
BEGIN

	SELECT DISTINCT ELIMINADO FROM GuiltyGear_User

END
GO

EXECUTE DBO.IsEliminado
GO

CREATE OR ALTER PROCEDURE DBO.SelectPlatform
AS
BEGIN

	SELECT DISTINCT P.Platform FROM GuiltyGear_Product P 

END
GO

EXECUTE DBO.SelectPlatform
GO

CREATE OR ALTER PROCEDURE DBO.SelectEdition
AS
BEGIN

	SELECT DISTINCT P.Edition FROM GuiltyGear_Product P 

END
GO

EXECUTE DBO.SelectEdition
GO


--Platform

CREATE OR ALTER PROCEDURE DBO.ListarPorPlataforma
@Platform as NVARCHAR(30)
AS
BEGIN

	SELECT*FROM GuiltyGear_Product WHERE Platform = @Platform

END
GO

EXECUTE DBO.ListarPorPlataforma 'XBOX'
GO


-- ==========================================================
-- Stored Procedures table GuiltyGear_Product
-- ==========================================================

CREATE OR ALTER PROCEDURE DBO.AddDataProductos
@Platform as NVARCHAR(30),
@Price as DECIMAL(10, 2),
@Type as NVARCHAR(30),
@Edition as NVARCHAR(50),
@ProductName as NVARCHAR(50),
@Stock as INT 
AS
BEGIN

	DECLARE @OrderID AS NVARCHAR(10) = 'GGST000'
	SELECT @OrderID = 'GGST' + RIGHT('000' + CAST(CAST(RIGHT(COALESCE(MAX(OrderID), 'GGST000'), 3) AS INT) + 1 AS NVARCHAR(10)), 3)
	FROM GuiltyGear_Product

	INSERT INTO GuiltyGear_Product (OrderID, Platform, Price, Type, Edition, ProductName, Stock)
	VALUES (@OrderID, @Platform, @Price, @Type, @Edition, @ProductName, @Stock)

END
GO

EXEC DBO.AddDataProductos
    @Platform = 'PS5',
    @Price = 59.99,
    @Type = 'Physical',
    @Edition = 'Deluxe',
    @ProductName = 'Guilty Gear -Strive-',
    @Stock = 10;
GO

--Soft delete
CREATE OR ALTER PROCEDURE DBO.DeleteDataProductos
@ProductID as INT
AS
BEGIN
	UPDATE GuiltyGear_Product
	SET ELIMINADO = 'YES' WHERE ProductID = @ProductID
END
GO

EXEC DBO.DeleteDataProductos '1'
GO

--Hard delete shopping cart
CREATE OR ALTER PROCEDURE DBO.DeleteOrderCompletely
    @PurchaseID INT
AS
BEGIN
    DELETE FROM GuiltyGear_Orders WHERE PurchaseID = @PurchaseID;
END
GO


CREATE OR ALTER PROCEDURE DBO.DisplayDataProductos
AS
BEGIN

	SELECT*FROM GuiltyGear_Product WHERE ELIMINADO = 'NO'

END
GO

EXEC DBO.DisplayDataProductos
GO


CREATE OR ALTER PROCEDURE DBO.UpdateDataProductos
@OrderID as NVARCHAR(10),
@Platform as NVARCHAR(30),
@Price as DECIMAL(10, 2),
@Type as NVARCHAR(30),
@Edition as NVARCHAR(50),
@ProductName as NVARCHAR(50),
@Stock as INT
AS
BEGIN
	Update GuiltyGear_Product 
	SET Platform = COALESCE(@Platform, Platform), Price = COALESCE(@Price, Price), 
	Type = COALESCE(@Type, Type), Edition = COALESCE(@Edition, Edition), ProductName = COALESCE(@ProductName, ProductName), 
	Stock = COALESCE(@Stock, Stock)
	WHERE OrderID = @OrderID
END
GO

CREATE OR ALTER PROCEDURE DBO.SearchDataProductos
@ProductID as INT
AS
BEGIN

	SELECT*FROM GuiltyGear_Product P Where P.ProductID = @ProductID;

END
GO

EXECUTE DBO.SearchDataProductos 1
GO

-- ==========================================================
-- Stored Procedures table GuiltyGear_User
-- ==========================================================


CREATE OR ALTER PROCEDURE DBO.AddDataUser
  @Name NVARCHAR(40),
  @LastName NVARCHAR(50),
  @Email NVARCHAR(80),
  @Password NVARCHAR(100),
  @Phone NVARCHAR(10) = 'N/A' 
AS
BEGIN
  SET NOCOUNT ON; 

  DECLARE @UserID NVARCHAR(10) = 'GGU000';
  SELECT @UserID = 'GGU' + RIGHT('000' + CAST(CAST(RIGHT(COALESCE(MAX(UserID), 'GGU000'), 3) AS INT) + 1 AS NVARCHAR(10)), 3)
  FROM GuiltyGear_User;

  INSERT INTO GuiltyGear_User (UserID, Name, LastName, Email, Password, Phone)
  VALUES (@UserID, @Name, @LastName, @Email, @Password, @Phone);

END
GO

EXECUTE DBO.AddDataUser 'Sol', 'Badguy', 'sol.badguy@guiltygear.com', 'Sol2025', '956241199'
GO


CREATE OR ALTER PROCEDURE DBO.DeleteDataUser
@UserID as NVARCHAR(10)
AS
BEGIN

	UPDATE GuiltyGear_User
	SET ELIMINADO = 'YES' WHERE UserID = @UserID

END
GO


CREATE OR ALTER PROCEDURE DBO.UpdateUser
  @UserID as NVARCHAR(10),
  @Name NVARCHAR(40),
  @LastName NVARCHAR(50),
  @Email NVARCHAR(80),
  @Password NVARCHAR(20),
  @Phone NVARCHAR(10) = 'N/A',
  @Eliminado NVARCHAR(3)
AS
BEGIN

	UPDATE GuiltyGear_User
	SET Name = COALESCE(@Name, Name), LastName = COALESCE(@LastName, LastName), 
	Email = COALESCE(@Email, Email),  Password = COALESCE(NULLIF(@Password, ''), Password), Phone = COALESCE(@Phone, Phone), 
	ELIMINADO = COALESCE(@Eliminado, ELIMINADO)
	WHERE UserID = @UserID

END
GO


CREATE OR ALTER PROCEDURE DBO.DisplayDataUser
AS
BEGIN

	SELECT*FROM GuiltyGear_User 

END
GO

Execute DBO.DisplayDataUser
GO

CREATE OR ALTER PROCEDURE DBO.SearchDataUserByLastname
@LastName as NVARCHAR(50)
AS
BEGIN

	SELECT*FROM GuiltyGear_User WHERE LastName = @LastName

END

EXECUTE DBO.SearchDataUserByLastname 'Michi';
GO


CREATE OR ALTER PROCEDURE DBO.SearchDataUserByID
@UserID as NVARCHAR(10)
AS
BEGIN

	SELECT*FROM GuiltyGear_User WHERE UserID = @UserID

END

EXECUTE DBO.SearchDataUserByID 'GGU002'
GO




-- ==========================================================
-- Stored Procedures table GuiltyGear_Orders
-- ==========================================================
SELECT*FROM GuiltyGear_Orders
GO

-- Insert new order
CREATE OR ALTER PROCEDURE DBO.AddDataOrder
    @UserID NVARCHAR(10),
    @ProductID INT,
    @ProductName NVARCHAR(40),
    @Purchase_Price DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO GuiltyGear_Orders (UserID, ProductID, ProductName, Purchase_Price)
    VALUES (@UserID, @ProductID, @ProductName, @Purchase_Price);
END
GO


CREATE OR ALTER PROCEDURE DBO.DeleteOrder
    @PurchaseID INT
AS
BEGIN
    UPDATE GuiltyGear_Orders
    SET ELIMINADO = 'YES'
    WHERE PurchaseID = @PurchaseID;
END
GO

-- update -admin view-
CREATE OR ALTER PROCEDURE DBO.UpdateOrder
	@PurchaseID AS INT,
    @ProductName AS NVARCHAR(40),
    @Purchase_Price AS DECIMAL(10, 2),
	@ELIMINADO AS NVARCHAR(3),
	@Status as NVARCHAR(20)
AS
BEGIN

	Update GuiltyGear_Orders
	SET ProductName = COALESCE(Nullif(@ProductName, ''), ProductName),
	    Purchase_Price = COALESCE(Nullif(@Purchase_Price, 9999) , Purchase_Price),-- 9999 is a sentinel value meaning "do not update this field"
		ELIMINADO = COALESCE(Nullif(@ELIMINADO, '') ,ELIMINADO),
		Status = COALESCE( Nullif(@Status, '') ,Status)
	WHERE PurchaseID = @PurchaseID

END
GO



--list order by id
CREATE OR ALTER PROCEDURE DBO.SearchOrderByUserID
@UserID AS NVARCHAR(10)
AS
BEGIN

	SELECT*FROM GuiltyGear_Orders WHERE UserID = @UserID AND ELIMINADO = 'NO';

END
GO
EXECUTE DBO.SearchOrderByUserID 'GGU003'



