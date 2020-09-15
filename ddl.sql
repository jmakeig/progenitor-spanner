CREATE TABLE Dimensions (
	dimensionID INT64 NOT NULL,
	label STRING(1024),
	description STRING(MAX),
	createDate TIMESTAMP,
) PRIMARY KEY(dimensionID);
CREATE TABLE Measures (
	measureID INT64 NOT NULL,
	dimensionX INT64,
	dimensionY INT64,
	value FLOAT64,
	comment STRING(MAX),
	CONSTRAINT FK_DimensionX FOREIGN KEY (dimensionX) REFERENCES Dimensions (dimensionID),
	CONSTRAINT FK_DimensionY FOREIGN KEY (dimensionY) REFERENCES Dimensions (dimensionID),
) PRIMARY KEY(measureID);