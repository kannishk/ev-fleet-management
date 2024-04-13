-- CreateTable
CREATE TABLE "ev_data" (
    "id" SERIAL NOT NULL,
    "Liscence_Plate" TEXT NOT NULL,
    "Maker" TEXT NOT NULL,
    "VIN" TEXT NOT NULL,
    "Model" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Miles_Driven" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ev_data_id_key" ON "ev_data"("id");
