const express = require("express");
const app = express();
var cors = require("cors");
import { PrismaClient } from "@prisma/client";
app.use(cors());
const prisma = new PrismaClient();

exports.handler = async (req: any, res: any) => {
  const { frequency, startDate, endDate } = req.query;

  try {
    let queryResult;

    switch (frequency) {
      case "daily":
        queryResult = await dailyMiles(startDate, endDate);
        break;
      case "weekly":
        queryResult = await weeklyMiles(startDate, endDate);
        break;
      case "monthly":
        queryResult = await monthlyMiles(startDate, endDate);
        break;
      case "yearly":
        queryResult = await yearlyMiles(startDate, endDate);
        break;
      default:
        return res.status(400).json({ message: "Invalid frequency" });
    }

    res.status(200).json(queryResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function dailyMiles(startDate: Date, endDate: Date) {
  const data = await prisma.ev_data.groupBy({
    by: ["Date"],
    where: {
      Date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      Miles_Driven: true,
    },
  });
  return data.map((item) => ({
    date: item.Date.toISOString().slice(0, 10),
    value: item._sum.Miles_Driven,
  }));
}

async function weeklyMiles(startDate: Date, endDate: Date) {
  const sql = `
    SELECT 
      date_trunc('week', "Date") AS week_start,
      SUM(Miles_Driven) AS value
    FROM ev_data
    WHERE "Date" >= $1 AND "Date" < $2
    GROUP BY week_start
    ORDER BY week_start ASC;
  `;

  const data: any = await prisma.$queryRawUnsafe(sql, [startDate, endDate]);

  return data.map((item: any) => ({
    date: item.week_start.toISOString().slice(0, 10),
    value: item.value,
  }));
}

async function monthlyMiles(startDate: Date, endDate: Date) {
  const sql = `
    SELECT 
      EXTRACT(YEAR FROM "Date") AS year,
      EXTRACT(MONTH FROM "Date") AS month,
      SUM(Miles_Driven) AS value
    FROM ev_data
    WHERE "Date" >= $1 AND "Date" < $2
    GROUP BY year, month
    ORDER BY year ASC, month ASC;
  `;

  const data: any = await prisma.$queryRawUnsafe(sql, [startDate, endDate]);

  return data.map((item: any) => ({
    date: `${item.year}-${item.month.toString().padStart(2, "0")}`,
    value: item.value,
  }));
}

async function yearlyMiles(startDate: Date, endDate: Date) {
  const sql = `
    SELECT 
      EXTRACT(YEAR FROM "Date") AS year,
      SUM(Miles_Driven) AS value
    FROM ev_data
    WHERE "Date" >= $1 AND "Date" < $2
    GROUP BY year
    ORDER BY year ASC;
  `;

  const data: any = await prisma.$queryRawUnsafe(sql, [startDate, endDate]);

  return data.map((item: any) => ({
    date: item.year,
    value: item.value,
  }));
}

app.listen(3000);
module.exports = app;
