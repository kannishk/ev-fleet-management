/*
  Warnings:

  - You are about to drop the column `Liscence_Plate` on the `ev_data` table. All the data in the column will be lost.
  - You are about to drop the column `Maker` on the `ev_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[License_Plate]` on the table `ev_data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `License_Plate` to the `ev_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Make` to the `ev_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ev_data_Liscence_Plate_key";

-- AlterTable
ALTER TABLE "ev_data" DROP COLUMN "Liscence_Plate",
DROP COLUMN "Maker",
ADD COLUMN     "License_Plate" TEXT NOT NULL,
ADD COLUMN     "Make" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ev_data_License_Plate_key" ON "ev_data"("License_Plate");
