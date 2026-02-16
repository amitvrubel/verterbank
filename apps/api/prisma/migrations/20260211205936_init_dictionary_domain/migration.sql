-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'DETERMINER', 'PREPOSITION', 'CONJUNCTION', 'PARTICLE', 'INTERJECTION', 'NUMERAL', 'PROPER_NOUN', 'OTHER');

-- CreateEnum
CREATE TYPE "GrammaticalGender" AS ENUM ('MASC', 'FEM', 'NEUT');

-- CreateEnum
CREATE TYPE "GrammaticalNumber" AS ENUM ('SG', 'PL');

-- CreateEnum
CREATE TYPE "PastAuxiliary" AS ENUM ('HABN', 'ZAYN', 'BOTH');

-- CreateEnum
CREATE TYPE "Tense" AS ENUM ('PRESENT', 'PAST', 'FUTURE');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('INDICATIVE', 'IMPERATIVE', 'CONDITIONAL');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('POSITIVE', 'COMPARATIVE', 'SUPERLATIVE');

-- CreateTable
CREATE TABLE "Headword" (
    "id" TEXT NOT NULL,
    "orth" TEXT NOT NULL,
    "searchOrth" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Headword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lexeme" (
    "id" TEXT NOT NULL,
    "headwordId" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech" NOT NULL,
    "grammaticalGender" "GrammaticalGender",
    "pastAuxiliary" "PastAuxiliary",
    "yivo" TEXT,
    "ipa" TEXT,
    "notes" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Lexeme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sense" (
    "id" TEXT NOT NULL,
    "lexemeId" TEXT NOT NULL,
    "definitionYi" TEXT,
    "glossYi" TEXT,
    "order" INTEGER NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Sense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "senseId" TEXT NOT NULL,
    "textYi" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SenseTranslation" (
    "id" TEXT NOT NULL,
    "senseId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "note" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "SenseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "lexemeId" TEXT NOT NULL,
    "valueOrth" TEXT NOT NULL,
    "valueSearch" TEXT NOT NULL,
    "yivo" TEXT,
    "ipa" TEXT,
    "note" TEXT,
    "order" INTEGER NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "number" "GrammaticalNumber",
    "person" INTEGER,
    "tense" "Tense",
    "mood" "Mood",
    "degree" "Degree",
    "gender" "GrammaticalGender",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageLabel" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsageLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LexemeUsageLabel" (
    "lexemeId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,

    CONSTRAINT "LexemeUsageLabel_pkey" PRIMARY KEY ("lexemeId","labelId")
);

-- CreateTable
CREATE TABLE "FormUsageLabel" (
    "formId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,

    CONSTRAINT "FormUsageLabel_pkey" PRIMARY KEY ("formId","labelId")
);

-- CreateIndex
CREATE INDEX "Headword_searchOrth_idx" ON "Headword"("searchOrth");

-- CreateIndex
CREATE INDEX "Lexeme_headwordId_idx" ON "Lexeme"("headwordId");

-- CreateIndex
CREATE UNIQUE INDEX "Lexeme_headwordId_partOfSpeech_grammaticalGender_key" ON "Lexeme"("headwordId", "partOfSpeech", "grammaticalGender");

-- CreateIndex
CREATE INDEX "Sense_lexemeId_order_idx" ON "Sense"("lexemeId", "order");

-- CreateIndex
CREATE INDEX "Example_senseId_order_idx" ON "Example"("senseId", "order");

-- CreateIndex
CREATE INDEX "SenseTranslation_senseId_lang_order_idx" ON "SenseTranslation"("senseId", "lang", "order");

-- CreateIndex
CREATE INDEX "Form_lexemeId_order_idx" ON "Form"("lexemeId", "order");

-- CreateIndex
CREATE INDEX "Form_valueSearch_idx" ON "Form"("valueSearch");

-- CreateIndex
CREATE UNIQUE INDEX "UsageLabel_slug_key" ON "UsageLabel"("slug");

-- CreateIndex
CREATE INDEX "LexemeUsageLabel_labelId_idx" ON "LexemeUsageLabel"("labelId");

-- CreateIndex
CREATE INDEX "FormUsageLabel_labelId_idx" ON "FormUsageLabel"("labelId");

-- AddForeignKey
ALTER TABLE "Lexeme" ADD CONSTRAINT "Lexeme_headwordId_fkey" FOREIGN KEY ("headwordId") REFERENCES "Headword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sense" ADD CONSTRAINT "Sense_lexemeId_fkey" FOREIGN KEY ("lexemeId") REFERENCES "Lexeme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SenseTranslation" ADD CONSTRAINT "SenseTranslation_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_lexemeId_fkey" FOREIGN KEY ("lexemeId") REFERENCES "Lexeme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LexemeUsageLabel" ADD CONSTRAINT "LexemeUsageLabel_lexemeId_fkey" FOREIGN KEY ("lexemeId") REFERENCES "Lexeme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LexemeUsageLabel" ADD CONSTRAINT "LexemeUsageLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "UsageLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormUsageLabel" ADD CONSTRAINT "FormUsageLabel_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormUsageLabel" ADD CONSTRAINT "FormUsageLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "UsageLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
