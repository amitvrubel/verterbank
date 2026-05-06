-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('SYNOMYM', 'ANTONYM', 'RELATED', 'DERVIED_FROM', 'VARIANT_OF');

-- CreateTable
CREATE TABLE "LexemeRelation" (
    "fromLexemeId" TEXT NOT NULL,
    "toLexemeId" TEXT NOT NULL,
    "type" "RelationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "LexemeRelation_pkey" PRIMARY KEY ("fromLexemeId","toLexemeId","type")
);

-- CreateIndex
CREATE INDEX "LexemeRelation_toLexemeId_idx" ON "LexemeRelation"("toLexemeId");

-- AddForeignKey
ALTER TABLE "LexemeRelation" ADD CONSTRAINT "LexemeRelation_fromLexemeId_fkey" FOREIGN KEY ("fromLexemeId") REFERENCES "Lexeme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LexemeRelation" ADD CONSTRAINT "LexemeRelation_toLexemeId_fkey" FOREIGN KEY ("toLexemeId") REFERENCES "Lexeme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
