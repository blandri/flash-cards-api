-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "owner" INTEGER;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
