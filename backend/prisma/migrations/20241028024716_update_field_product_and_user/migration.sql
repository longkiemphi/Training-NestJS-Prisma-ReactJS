/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - Added the required column `conditon` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerEmail` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerPhone` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "description",
DROP COLUMN "price",
ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "conditon" TEXT NOT NULL,
ADD COLUMN     "ownerEmail" TEXT NOT NULL,
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "ownerPhone" TEXT NOT NULL,
ADD COLUMN     "ram" TEXT NOT NULL,
ADD COLUMN     "storage" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
