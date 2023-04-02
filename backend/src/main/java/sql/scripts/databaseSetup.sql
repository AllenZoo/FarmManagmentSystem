DROP TABLE Manages_Housing;
DROP TABLE MANAGES_PEN;
DROP TABLE Lives;
DROP TABLE Contains;
DROP TABLE Nurtures;
DROP TABLE Creates;
DROP TABLE Tends;
DROP TABLE Buys;
DROP TABLE IsGrowing;
DROP TABLE Buyers_DealsWith;
DROP TABLE Farmers_2;
DROP TABLE Fields_4;
DROP TABLE Fields_1;
DROP TABLE VeterinaryRecords_Has;
DROP TABLE Livestock_4;
DROP TABLE Pen;
DROP TABLE Housing;
DROP TABLE Farmers_1;
DROP TABLE Crops;
DROP TABLE Fields_3;
DROP TABLE Livestock_1;
DROP TABLE Livestock_3;
DROP TABLE LIVESTOCKPRODUCE;



/* -------------------------------------------------------------------------- */
/*                            Create Entity Tables                            */
/* -------------------------------------------------------------------------- */
CREATE TABLE Pen (
  facilityID INTEGER PRIMARY KEY,
  name VARCHAR(30),
  age INTEGER,
  maxCapacity INTEGER NOT NULL,
  upkeep INTEGER,
  typeOfAnimals VARCHAR(10) CHECK (
    typeOfAnimals IN ('chicken', 'sheep', 'cow', 'pig')
  )
);

CREATE TABLE Housing (
  facilityID INTEGER PRIMARY KEY,
  name VARCHAR(30),
  age INTEGER,
  maxCapacity INTEGER,
  upkeep INTEGER NOT NULL,
  rent INTEGER,
  distanceToFields INTEGER,
  distanceFromPens INTEGER
);

CREATE TABLE Farmers_1 (
  yearsOfEmployment INTEGER PRIMARY KEY,
  salary INTEGER
);

CREATE TABLE Farmers_2 (
  farmerID INTEGER PRIMARY KEY,
  fullName VARCHAR(50) NOT NULL,
  yearsOfEmployment INTEGER,
  FOREIGN KEY (yearsOfEmployment) REFERENCES Farmers_1 (yearsOfEmployment)
);

CREATE TABLE Crops (
  cropType VARCHAR(10) CHECK(
    cropType IN (
      'canola',
      'wheat',
      'corn',
      'potatoes',
      'mustard',
      'coconut'
    )
  ),
  variant VARCHAR(10) CHECK(variant IN ('pollinated', 'hybrids')),
  plantStatus VARCHAR(10) CHECK(plantStatus IN ('planted', 'harvested')),
  quantity INTEGER,
  PRIMARY KEY (cropType, variant)
);

CREATE TABLE Fields_3 (
  suitableCrops VARCHAR(30) PRIMARY KEY,
  pesticidesAndChemicals INTEGER
);

CREATE TABLE Fields_1 (
  nutrientLevels REAL PRIMARY KEY,
  suitableCrops VARCHAR(30),
  FOREIGN KEY (suitableCrops) REFERENCES Fields_3 (suitableCrops)
);

CREATE TABLE Fields_4 (
  plotNum INTEGER PRIMARY KEY,
  nutrientLevels REAL,
  capacity INTEGER,
  state VARCHAR(10) CHECK(state IN ('empty', 'growing', 'resting')),
  FOREIGN KEY (nutrientLevels) REFERENCES Fields_1 (nutrientLevels)
);

CREATE TABLE Livestock_1 (
  animalType VARCHAR(10) CHECK(animalType IN ('chicken', 'sheep', 'cow', 'pig')),
  weight REAL,
  diet VARCHAR(10) CHECK(
    diet IN (
      'canola',
      'wheat',
      'corn',
      'potatoes',
      'mustard',
      'coconut'
    )
  ),
  PRIMARY KEY (weight, animalType)
);

CREATE TABLE Livestock_3 (
  animalType VARCHAR(10) CHECK(animalType IN ('chicken', 'sheep', 'cow', 'pig')),
  age INTEGER,
  harvestable INTEGER,
  PRIMARY KEY(animalType, age)
);

CREATE TABLE Livestock_4 (
  tagID INTEGER PRIMARY KEY,
  animalType VARCHAR(10) CHECK(animalType IN ('chicken', 'sheep', 'cow', 'pig')),
  age INTEGER,
  weight REAL,
  lastFed DATE,
  lastViolatedForHarvestedGoods DATE,
  FOREIGN KEY (weight, animalType) REFERENCES Livestock_1 (weight, animalType),
  FOREIGN KEY (animalType, age) REFERENCES Livestock_3 (animalType, age)
);

CREATE TABLE LivestockProduce (
  productType VARCHAR(10) CHECK(
    productType IN (
      'milk',
      'eggs',
      'beef',
      'bacon',
      'poultry',
      'wool',
      'manure'
    )
  ),
  quantity INTEGER,
  PRIMARY KEY (productType)
);

CREATE TABLE Buyers_DealsWith (
  buyerID INTEGER PRIMARY KEY,
  farmerID INTEGER NOT NULL,
  address VARCHAR(100),
  dealer_name VARCHAR(40),
  phoneNumber VARCHAR(30),
  purchase_date DATE,
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID)
);

CREATE TABLE VeterinaryRecords_Has (
  tagID INTEGER NOT NULL,
  recordID INTEGER,
  record_date DATE,
  healthStatus VARCHAR(30),
  PRIMARY KEY (tagID, recordID),
  FOREIGN KEY (tagID) REFERENCES Livestock_4 (tagID)
  ON DELETE CASCADE
);

/* -------------------------------------------------------------------------- */
/*                         Create Relationship Tables                         */
/* -------------------------------------------------------------------------- */
CREATE TABLE Manages_Housing (
  facilityID INTEGER,
  farmerID INTEGER,
  lastMaintained DATE,
  PRIMARY KEY (facilityID, farmerID),
  FOREIGN KEY (facilityID) REFERENCES Housing (facilityID),
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID)
);

CREATE TABLE Manages_Pen (
  facilityID INTEGER,
  farmerID INTEGER,
  lastMaintained DATE,
  PRIMARY KEY (facilityID, farmerID),
  FOREIGN KEY (facilityID) REFERENCES Pen (facilityID),
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID)
);

CREATE TABLE Lives (
  facilityID INTEGER,
  farmerID INTEGER,
  farmersHoused INTEGER,
  PRIMARY KEY (facilityID, farmerID),
  FOREIGN KEY (facilityID) REFERENCES Housing (facilityID),
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID)
);

CREATE TABLE Contains (
  facilityID INTEGER,
  tagID INTEGER,
  capacityOccupied INTEGER,
  PRIMARY KEY (facilityID, tagID),
  FOREIGN KEY (facilityID) REFERENCES Pen (facilityID),
  FOREIGN KEY (tagID) REFERENCES Livestock_4 (tagID)
);

CREATE TABLE Nurtures (
  farmerID INTEGER,
  tagID INTEGER,
  waterSpent INTEGER,
  foodSpent INTEGER,
  PRIMARY KEY (farmerID, tagID),
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID),
  FOREIGN KEY (tagID) REFERENCES Livestock_4 (tagID)
);

CREATE TABLE Creates (
  productType VARCHAR(10) CHECK(
    productType IN (
      'milk',
      'eggs',
      'beef',
      'bacon',
      'poultry',
      'wool',
      'manure'
    )
  ),
  tagID INTEGER,
  amount INTEGER,
  dateProduced DATE,
  PRIMARY KEY (productType, tagID),
  FOREIGN KEY (tagID) REFERENCES Livestock_4 (tagID),
  FOREIGN KEY (productType) REFERENCES LivestockProduce (productType)
);

CREATE TABLE Tends (
  farmerID INTEGER,
  plotNum INTEGER,
  waterSpent INTEGER,
  PRIMARY KEY (farmerID, plotNum),
  FOREIGN KEY (farmerID) REFERENCES Farmers_2 (farmerID),
  FOREIGN KEY (plotNum) REFERENCES Fields_4 (plotNum)
);

CREATE TABLE Buys (
  buyerID INTEGER,
  variant VARCHAR(10) CHECK(variant IN ('pollinated', 'hybrids')),
  cropType VARCHAR(10) CHECK(
    cropType IN (
      'canola',
      'wheat',
      'corn',
      'potatoes',
      'mustard',
      'coconut'
    )
  ),
  productType VARCHAR(10) CHECK(
    productType IN (
      'milk',
      'eggs',
      'beef',
      'bacon',
      'poultry',
      'wool',
      'manure'
    )
  ),
  quantity INTEGER,
  price INTEGER,
  transactionID INTEGER,
  PRIMARY KEY (productType, buyerID, variant, cropType),
  FOREIGN KEY (buyerID) REFERENCES Buyers_DealsWith (buyerID),
  FOREIGN KEY (productType) REFERENCES LivestockProduce (productType),
  FOREIGN KEY (cropType, variant) REFERENCES Crops (cropType, variant)
);

CREATE TABLE IsGrowing (
  plotNum INTEGER,
  cropType VARCHAR(10) CHECK(
    cropType IN (
      'canola',
      'wheat',
      'corn',
      'potatoes',
      'mustard',
      'coconut'
    )
  ),
  variant VARCHAR(10) CHECK(variant IN ('pollinated', 'hybrids')),
  lastWatered DATE,
  plantedDate DATE,
  harvestDate DATE,
  PRIMARY KEY (plotNum, variant, cropType),
  FOREIGN KEY (plotNum) REFERENCES Fields_4 (plotNum),
  FOREIGN KEY (cropType, variant) REFERENCES Crops (cropType, variant)
);

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                          Insert Into Entity Tables                         */
/* -------------------------------------------------------------------------- */
INSERT INTO Pen (facilityID, name, age, maxCapacity, upkeep, typeOfAnimals) VALUES (2001, 'HomeOfDaBECKY', 1, 5, 120, 'cow');
INSERT INTO Pen (facilityID, name, age, maxCapacity, upkeep, typeOfAnimals) VALUES (2002, 'YeetTown', 4, 20, 111, 'chicken');
INSERT INTO Pen (facilityID, name, age, maxCapacity, upkeep, typeOfAnimals) VALUES (2003, 'MudPit', 8, 12, 50, 'pig');
INSERT INTO Pen (facilityID, name, age, maxCapacity, upkeep, typeOfAnimals) VALUES (2004, 'Vegans', 2, 8, 130, 'sheep');
INSERT INTO Pen (facilityID, name, age, maxCapacity, upkeep, typeOfAnimals) VALUES (2005, 'Chonky Charlies Cave', 3, 3, 301, 'cow');


INSERT INTO Housing (facilityID, name, age, maxCapacity,upkeep, rent, distanceToFields, distanceFromPens) VALUES (3001, 'Harvest Homestead', 10, 4, 200, 500, 2, 1);
INSERT INTO Housing (facilityID, name, age, maxCapacity,upkeep, rent, distanceToFields, distanceFromPens) VALUES (3002, 'The Grainery', 5, 6, 300, 700, 3, 2);
INSERT INTO Housing (facilityID, name, age, maxCapacity,upkeep, rent, distanceToFields, distanceFromPens) VALUES (3003, 'Tillers'' Retreat', 20, 12, 500, 1000, 4, 3);
INSERT INTO Housing (facilityID, name, age, maxCapacity,upkeep, rent, distanceToFields, distanceFromPens) VALUES (3004, 'Barnhouse Bliss', 15, 8, 400, 800, 5, 2);
INSERT INTO Housing (facilityID, name, age, maxCapacity,upkeep, rent, distanceToFields, distanceFromPens) VALUES (3005, 'Crop Cottage', 25, 20, 600, 600, 4, 5);


INSERT INTO Crops (cropType, variant, plantStatus, quantity) VALUES ('canola', 'pollinated', 'planted', 100);
INSERT INTO Crops (cropType, variant, plantStatus, quantity) VALUES ('wheat', 'hybrids', 'harvested', 200);
INSERT INTO Crops (cropType, variant, plantStatus, quantity) VALUES ('corn', 'pollinated', 'planted', 150);
INSERT INTO Crops (cropType, variant, plantStatus, quantity) VALUES ('wheat', 'pollinated', 'planted', 50);
INSERT INTO Crops (cropType, variant, plantStatus, quantity) VALUES ('canola', 'hybrids', 'harvested', 300);


INSERT INTO Farmers_1 (yearsOfEmployment, salary) VALUES (1, 50000);
INSERT INTO Farmers_1 (yearsOfEmployment, salary) VALUES (2, 75000);
INSERT INTO Farmers_1 (yearsOfEmployment, salary) VALUES (3, 90000);
INSERT INTO Farmers_1 (yearsOfEmployment, salary) VALUES (5, 120000);
INSERT INTO Farmers_1 (yearsOfEmployment, salary) VALUES (10, 150000);


INSERT INTO Farmers_2 (farmerID, fullName, yearsOfEmployment) VALUES (1001, 'John Smith', 3);
INSERT INTO Farmers_2 (farmerID, fullName, yearsOfEmployment) VALUES (1002, 'Emily Brown', 1);
INSERT INTO Farmers_2 (farmerID, fullName, yearsOfEmployment) VALUES (1003, 'Michael Johnson', 5);
INSERT INTO Farmers_2 (farmerID, fullName, yearsOfEmployment) VALUES (1004, 'Maria Hernandez', 2);
INSERT INTO Farmers_2 (farmerID, fullName, yearsOfEmployment) VALUES (1005, 'David Kim', 10);


INSERT INTO Livestock_1 (animalType, weight, diet) VALUES ('chicken', 10, 'corn');
INSERT INTO Livestock_1 (animalType, weight, diet) VALUES ('chicken', 5, 'canola');
INSERT INTO Livestock_1 (animalType, weight, diet) VALUES ('cow', 70, 'wheat');
INSERT INTO Livestock_1 (animalType, weight, diet) VALUES ('sheep', 55, 'canola');
INSERT INTO Livestock_1 (animalType, weight, diet) VALUES ('pig', 45, 'corn');


INSERT INTO Livestock_3 (animalType, age, harvestable) VALUES ('chicken', 1, 0);
INSERT INTO Livestock_3 (animalType, age, harvestable) VALUES ('chicken', 3, 1);
INSERT INTO Livestock_3 (animalType, age, harvestable) VALUES ('cow', 4, 0);
INSERT INTO Livestock_3 (animalType, age, harvestable) VALUES ('sheep', 6, 1);
INSERT INTO Livestock_3 (animalType, age, harvestable) VALUES ('pig', 4, 1);


INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, lastViolatedForHarvestedGoods) VALUES (4001, 'chicken', 1, 10, DATE '2022-04-12', DATE '2022-04-04');
INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, lastViolatedForHarvestedGoods) VALUES (4002, 'chicken', 3, 5,DATE '2022-04-12', DATE '2022-04-01');
INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, lastViolatedForHarvestedGoods) VALUES (4003, 'cow', 4, 70,DATE '2022-04-10', DATE '2022-04-10');
INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, lastViolatedForHarvestedGoods) VALUES (4004, 'sheep', 6, 55,DATE '2022-04-12', NULL);
INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, lastViolatedForHarvestedGoods) VALUES (4005, 'pig', 4, 45, DATE '2022-04-11', NULL);


INSERT INTO Fields_3 (suitableCrops, pesticidesAndChemicals) VALUES ('corn', 0);
INSERT INTO Fields_3 (suitableCrops, pesticidesAndChemicals) VALUES ('wheat', 1); 
INSERT INTO Fields_3 (suitableCrops, pesticidesAndChemicals) VALUES ('mustard', 0);
INSERT INTO Fields_3 (suitableCrops, pesticidesAndChemicals) VALUES ('potatoes', 1);
INSERT INTO Fields_3 (suitableCrops, pesticidesAndChemicals) VALUES ('canola', 1);


INSERT INTO Fields_1 (nutrientLevels, suitableCrops) VALUES (1002, 'canola');
INSERT INTO Fields_1 (nutrientLevels, suitableCrops) VALUES (300, 'corn');
INSERT INTO Fields_1 (nutrientLevels, suitableCrops) VALUES (150, 'potatoes');
INSERT INTO Fields_1 (nutrientLevels, suitableCrops) VALUES (670, 'mustard');
INSERT INTO Fields_1 (nutrientLevels, suitableCrops) VALUES (450, 'wheat');


INSERT INTO Fields_4 (plotNum, nutrientLevels, capacity, state) VALUES (5001, 1002, 300000, 'empty');
INSERT INTO Fields_4 (plotNum, nutrientLevels, capacity, state) VALUES (5002, 300, 1000000, 'growing');
INSERT INTO Fields_4 (plotNum, nutrientLevels, capacity, state) VALUES (5003, 150, 3150, 'empty');
INSERT INTO Fields_4 (plotNum, nutrientLevels, capacity, state) VALUES (5004, 670, 400, 'growing');
INSERT INTO Fields_4 (plotNum, nutrientLevels, capacity, state) VALUES (5005, 450, 0, 'resting');

 
INSERT INTO LivestockProduce (productType, quantity) VALUES ('eggs', 21);
INSERT INTO LivestockProduce (productType, quantity) VALUES ('manure', 731);
INSERT INTO LivestockProduce (productType, quantity) VALUES ('wool', 121);
INSERT INTO LivestockProduce (productType, quantity) VALUES ('beef', 22);INSERT INTO LivestockProduce (productType, quantity) VALUES ('poultry', 26);
INSERT INTO LivestockProduce (productType, quantity) VALUES ('milk', 20);

 
INSERT INTO Buyers_DealsWith (buyerID, farmerID, address, dealer_name, phoneNumber, purchase_date) VALUES (6001, 1002, '4523 Elmwood Avenue, Philadelphia, PA 19103', 'Ethan Williams', '(604) 123-4567', '2023-06-11');
INSERT INTO Buyers_DealsWith (buyerID, farmerID, address, dealer_name, phoneNumber, purchase_date) VALUES (6002, 1005, '7281 8th Street, Miami, FL 33130',  'Sophia Thompson', '(604) 555-1212', '2024-01-03');
INSERT INTO Buyers_DealsWith (buyerID, farmerID, address, dealer_name, phoneNumber, purchase_date) VALUES (6003, 1001, '2128 Linden Avenue, Seattle, WA 98101', 'Luke Carter', '(604) 867-5309', '2022-11-24');
INSERT INTO Buyers_DealsWith (buyerID, farmerID, address, dealer_name, phoneNumber, purchase_date) VALUES (6004, 1005, '9911 Oakwood Drive, San Francisco, CA 94107', 'Olivia Wright', '(604) 987-6543', '2023-09-01');
INSERT INTO Buyers_DealsWith (buyerID, farmerID, address, dealer_name, phoneNumber, purchase_date) VALUES (6005, 1005, '6316 Maple Street, Houston, TX 77030', 'Benjamin Cooper', '(604) 246-8242', '2024-03-12');


INSERT INTO VeterinaryRecords_Has (tagID, recordID, record_date, healthStatus) VALUES (4001, 6001, DATE '2022-07-12', 'healthy');
INSERT INTO VeterinaryRecords_Has (tagID, recordID, record_date, healthStatus) VALUES (4002, 6002, DATE '2022-09-05', 'sick');
INSERT INTO VeterinaryRecords_Has (tagID, recordID, record_date, healthStatus) VALUES (4003, 6003, DATE '2022-06-21', 'healthy');
INSERT INTO VeterinaryRecords_Has (tagID, recordID, record_date, healthStatus) VALUES (4004, 6004, DATE '2022-11-17', 'injured');
INSERT INTO VeterinaryRecords_Has (tagID, recordID, record_date, healthStatus) VALUES (4005, 6005, DATE '2022-08-08', 'healthy');

/* -------------------------------------------------------------------------- */
/*                       Insert Into Relationship Tables                      */
/* -------------------------------------------------------------------------- */
INSERT INTO Manages_Housing (facilityID, farmerID, lastMaintained) VALUES (3001, 1001, '2022-01-15');
INSERT INTO Manages_Housing (facilityID, farmerID, lastMaintained) VALUES (3002, 1002, '2022-01-25');
INSERT INTO Manages_Housing (facilityID, farmerID, lastMaintained) VALUES (3003, 1003, '2022-01-20');
INSERT INTO Manages_Housing (facilityID, farmerID, lastMaintained) VALUES (3004, 1004, '2022-01-12');
INSERT INTO Manages_Housing (facilityID, farmerID, lastMaintained) VALUES (3005, 1005, '2022-01-18');


INSERT INTO Manages_Pen (facilityID, farmerID, lastMaintained) VALUES (2001, 1001, '2022-01-15');
INSERT INTO Manages_Pen (facilityID, farmerID, lastMaintained) VALUES (2002, 1002, '2022-01-25');
INSERT INTO Manages_Pen (facilityID, farmerID, lastMaintained) VALUES (2003, 1003, '2022-01-20');
INSERT INTO Manages_Pen (facilityID, farmerID, lastMaintained) VALUES (2004, 1004, '2022-01-12');
INSERT INTO Manages_Pen (facilityID, farmerID, lastMaintained) VALUES (2005, 1005, '2022-01-18');


INSERT INTO Lives (facilityID, farmerID, farmersHoused) VALUES (3001, 1001, 4);
INSERT INTO Lives (facilityID, farmerID, farmersHoused) VALUES (3002, 1002, 6);
INSERT INTO Lives (facilityID, farmerID, farmersHoused) VALUES (3003, 1003, 12);
INSERT INTO Lives (facilityID, farmerID, farmersHoused) VALUES (3004, 1004, 8);
INSERT INTO Lives (facilityID, farmerID, farmersHoused) VALUES (3005, 1005, 20);


INSERT INTO Contains (facilityID, tagID, capacityOccupied) VALUES (2001, 4001, 20);
INSERT INTO Contains (facilityID, tagID, capacityOccupied) VALUES (2001, 4002, 30); 
INSERT INTO Contains (facilityID, tagID, capacityOccupied) VALUES (2002, 4003, 25);
INSERT INTO Contains (facilityID, tagID, capacityOccupied) VALUES (2002, 4004, 35);
INSERT INTO Contains (facilityID, tagID, capacityOccupied) VALUES (2003, 4005, 40);


INSERT INTO Nurtures (farmerID, tagID, waterSpent, foodSpent) VALUES (1001, 4001, 10, 15);
INSERT INTO Nurtures (farmerID, tagID, waterSpent, foodSpent) VALUES (1002, 4002, 20, 25);
INSERT INTO Nurtures (farmerID, tagID, waterSpent, foodSpent) VALUES (1003, 4003, 15, 20);
INSERT INTO Nurtures (farmerID, tagID, waterSpent, foodSpent) VALUES (1004, 4004, 5, 10);
INSERT INTO Nurtures (farmerID, tagID, waterSpent, foodSpent) VALUES (1005, 4005, 25, 30);


INSERT INTO Creates (productType, tagID, amount, dateProduced) VALUES ('milk', 4001, 100, '2022-01-01');
INSERT INTO Creates (productType, tagID, amount, dateProduced) VALUES ('eggs', 4002, 50, '2022-01-02');
INSERT INTO Creates (productType, tagID, amount, dateProduced) VALUES ('beef', 4003, 200, '2022-01-05');
INSERT INTO Creates (productType, tagID, amount, dateProduced) VALUES ('poultry', 4004, 100, '2022-01-07');
INSERT INTO Creates (productType, tagID, amount, dateProduced) VALUES ('wool', 4005, 75, '2022-01-10');    	


INSERT INTO Tends (farmerID, plotNum, waterSpent) VALUES (1001, 5001, 10);
INSERT INTO Tends (farmerID, plotNum, waterSpent) VALUES (1002, 5002, 20);
INSERT INTO Tends (farmerID, plotNum, waterSpent) VALUES (1003, 5003, 15);
INSERT INTO Tends (farmerID, plotNum, waterSpent) VALUES (1004, 5004, 5);
INSERT INTO Tends (farmerID, plotNum, waterSpent) VALUES (1005, 5005, 25);


INSERT INTO Buys (buyerID, cropType, variant, productType, quantity, price, transactionID) VALUES (6001, 'canola', 'hybrids', 'milk', 20, 50, 1);
INSERT INTO Buys (buyerID, cropType, variant, productType, quantity, price, transactionID) VALUES (6002, 'wheat', 'pollinated', 'eggs', 30, 20, 2);
INSERT INTO Buys (buyerID, cropType, variant, productType, quantity, price, transactionID) VALUES (6003, 'corn', 'pollinated', 'beef', 15, 100, 3);
INSERT INTO Buys (buyerID, cropType, variant, productType, quantity, price, transactionID) VALUES (6004, 'wheat', 'pollinated', 'poultry', 10, 40, 4); 
INSERT INTO Buys (buyerID, cropType, variant, productType, quantity, price, transactionID) VALUES (6005, 'canola', 'pollinated', 'manure', 50, 5, 5);


INSERT INTO IsGrowing (plotNum, cropType, variant, lastWatered, plantedDate, harvestDate) VALUES (5001, 'canola', 'pollinated', '2023-01-28', '2023-01-01', '2023-04-01');
INSERT INTO IsGrowing (plotNum, cropType, variant, lastWatered, plantedDate, harvestDate) VALUES (5002, 'wheat', 'hybrids', '2023-01-29', '2023-01-02', '2023-04-02');
INSERT INTO IsGrowing (plotNum, cropType, variant, lastWatered, plantedDate, harvestDate) VALUES (5003, 'corn', 'pollinated', '2023-01-30', '2023-01-03', '2023-04-03');
INSERT INTO IsGrowing (plotNum, cropType, variant, lastWatered, plantedDate, harvestDate) VALUES (5004, 'wheat', 'pollinated', '2023-01-28', '2023-01-04', '2023-04-04');
INSERT INTO IsGrowing (plotNum, cropType, variant, lastWatered, plantedDate, harvestDate) VALUES (5005, 'canola', 'hybrids', '2023-01-29', '2023-01-05', '2023-04-05');
