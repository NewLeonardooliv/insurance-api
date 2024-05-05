-- CreateTable
CREATE TABLE "insurances" (
    "id" SERIAL NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "driving_experience" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "income" TEXT NOT NULL,
    "credit_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "vehicle_ownership" BOOLEAN NOT NULL,
    "vehicle_year" TEXT NOT NULL,
    "married" BOOLEAN NOT NULL,
    "children" BOOLEAN NOT NULL,
    "postal_code" TEXT NOT NULL,
    "annual_mileage" INTEGER NOT NULL DEFAULT 0,
    "vehicle_type" TEXT NOT NULL,
    "speeding_violations" INTEGER NOT NULL,
    "duis" INTEGER NOT NULL,
    "past_accidents" INTEGER NOT NULL,
    "outcome" BOOLEAN NOT NULL,

    CONSTRAINT "insurances_pkey" PRIMARY KEY ("id")
);
