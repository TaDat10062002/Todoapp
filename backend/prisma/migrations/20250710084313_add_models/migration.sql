/*
  Warnings:

  - You are about to drop the column `status` on the `status` table. All the data in the column will be lost.
  - Added the required column `color` to the `Priority` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `priority` ADD COLUMN `color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `status` DROP COLUMN `status`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
