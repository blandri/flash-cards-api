-- CreateTable
CREATE TABLE "_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categories_AB_unique" ON "_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_categories_B_index" ON "_categories"("B");

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
