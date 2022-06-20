/*
  Warnings:

  - You are about to drop the column `owner` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_owner_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "owner",
ADD COLUMN     "ownerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
