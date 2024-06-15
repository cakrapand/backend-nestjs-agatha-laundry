/*
  Warnings:

  - You are about to drop the column `redirectUrl` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_redirectUrl_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "redirectUrl";
