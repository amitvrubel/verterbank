/*
  Warnings:

  - A unique constraint covering the columns `[orth]` on the table `Headword` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lexeme_headwordId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Headword_orth_key" ON "Headword"("orth");

-- CreateIndex
CREATE INDEX "Lexeme_headwordId_yivo_idx" ON "Lexeme"("headwordId", "yivo");
