import { PrismaClient } from "@prisma/client";
const fs = require("fs");
const csv = require("csv-parser");

const prisma = new PrismaClient();

async function uploadCSVToDB(csvFilePath: any) {
  const csvData: any = [];

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data: any) => csvData.push(data))
    .on("end", async () => {
      console.log(`Loaded ${csvData.length} records from the CSV file`);

      // Insert the data into the database
      for (const record of csvData) {
        const { License_Plate, Make, VIN, Model, Type, Date, Miles_Driven } =
          record;

        try {
          await prisma.ev_data.create({
            data: {
              License_Plate: License_Plate,
              Make: Make,
              VIN: VIN,
              Model: Model,
              Type: Type,
              Date: Date,
              Miles_Driven: parseInt(Miles_Driven),
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      console.log("Data upload completed successfully");
    });
}

uploadCSVToDB("output.csv");
