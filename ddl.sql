CREATE TABLE Users (
	userID INT64 NOT NULL,
	name STRING(1024) NOT NULL,
	description STRING(MAX)
) PRIMARY KEY(userID);


CREATE TABLE Scenarios (
	scenarioID INT64 NOT NULL,
	label string(1024),
	description STRING(MAX),
	ownerID INT64
) PRIMARY KEY(scenarioID);

CREATE TABLE Dimensions (
	dimensionID INT64 NOT NULL,
	label STRING(1024),
	description STRING(MAX),
	createDate TIMESTAMP,
	ownerId INT64
) PRIMARY KEY(dimensionID);

CREATE TABLE Measures (
	scenarioID INT64 NOT NULL,
	measureID INT64 NOT NULL,
	dimensionX INT64,
	dimensionY INT64,
	value FLOAT64,
	description STRING(MAX),
	ownerID INT64,
	CONSTRAINT FK_DimensionX FOREIGN KEY (dimensionX) REFERENCES Dimensions (dimensionID),
	CONSTRAINT FK_DimensionY FOREIGN KEY (dimensionY) REFERENCES Dimensions (dimensionID),
	CONSTRAINT FK_User FOREIGN KEY (ownerID) REFERENCES Users (userID)
) PRIMARY KEY(scenarioID,  measureID),
  INTERLEAVE IN PARENT Scenarios ON DELETE CASCADE;







