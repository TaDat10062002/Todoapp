/*
  Warnings:

  - You are about to alter the column `isDone` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `isDone` VARCHAR(191) NOT NULL DEFAULT '0';
