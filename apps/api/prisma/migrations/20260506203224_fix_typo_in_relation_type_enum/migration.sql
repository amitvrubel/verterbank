/*
  Warnings:

  - The values [DERVIED_FROM] on the enum `RelationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RelationType_new" AS ENUM ('SYNOMYM', 'ANTONYM', 'RELATED', 'DERIVED_FROM', 'VARIANT_OF');
ALTER TABLE "LexemeRelation" ALTER COLUMN "type" TYPE "RelationType_new" USING ("type"::text::"RelationType_new");
ALTER TYPE "RelationType" RENAME TO "RelationType_old";
ALTER TYPE "RelationType_new" RENAME TO "RelationType";
DROP TYPE "public"."RelationType_old";
COMMIT;
