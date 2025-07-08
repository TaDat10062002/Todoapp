/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `deletedAt`,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
