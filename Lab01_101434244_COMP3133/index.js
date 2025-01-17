// Libraries
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

// File paths
const inputFilePath = path.join(__dirname, "input_countries.csv");
const canadaFilePath = path.join(__dirname, "canada.txt");
const usaFilePath = path.join(__dirname, "usa.txt");

// Data arrays
const canadaData = [];
const usaData = [];

// Delete canada.txt and usa.txt if they already exist
if (fs.existsSync(canadaFilePath)) {
  fs.unlinkSync(canadaFilePath);
}

if (fs.existsSync(usaFilePath)) {
  fs.unlinkSync(usaFilePath);
}

// Read input_countries.csv and write canada.txt and usa.txt
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    if (row.country.toLowerCase() === "canada") {
      canadaData.push(row);
    } else if (row.country.toLowerCase() === "united states") {
      usaData.push(row);
    }
  })
  .on("end", () => {
    fs.writeFileSync(canadaFilePath, JSON.stringify(canadaData, null, 2));
    fs.writeFileSync(usaFilePath, JSON.stringify(usaData, null, 2));
    console.log("canada.txt and usa.txt created successfully");
  });
