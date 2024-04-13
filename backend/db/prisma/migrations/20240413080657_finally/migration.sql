/*
  Warnings:

  - A unique constraint covering the columns `[Liscence_Plate]` on the table `ev_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[VIN]` on the table `ev_data` will be added. If there are existing duplicate values, this will fail.
  - Made the column `Date` on table `ev_data` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ev_data" ALTER COLUMN "Date" SET NOT NULL,
ALTER COLUMN "Date" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "ev_data_Liscence_Plate_key" ON "ev_data"("Liscence_Plate");

-- CreateIndex
CREATE UNIQUE INDEX "ev_data_VIN_key" ON "ev_data"("VIN");
