import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function upload() {
  await prisma.ev_data.create({
    data: {
      Liscence_Plate: "NGX4CPH",
      Maker: "Tesla",
      VIN: "KYGKGBXYN5Z184ZKW",
      Model: "Semi Delivery Event",
      Type: "2022	Truc",
      Date: "2023-04-25T00:00:00Z",
      Miles_Driven: 199,
    },
  });
  console.log("Success");
}

upload();

//NGX4CPH		KYGKGBXYN5Z184ZKW	Semi Delivery Event, 2022	Truck	2023-04-25T00:00:00Z	199
