/*
  Warnings:

  - You are about to drop the `_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_categories" DROP CONSTRAINT "_categories_A_fkey";

-- DropForeignKey
ALTER TABLE "_categories" DROP CONSTRAINT "_categories_B_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_categories";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
