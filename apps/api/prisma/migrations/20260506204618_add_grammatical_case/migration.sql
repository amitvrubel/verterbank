-- CreateEnum
CREATE TYPE "GrammaticalCase" AS ENUM ('NOMINATIVE', 'ACCUSATIVE', 'DATIVE');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "case" "GrammaticalCase";
