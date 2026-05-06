/*
  Warnings:

  - The primary key for the `LexemeRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LexemeRelation" DROP CONSTRAINT "LexemeRelation_pkey",
ADD CONSTRAINT "LexemeRelation_pkey" PRIMARY KEY ("fromLexemeId", "toLexemeId");
