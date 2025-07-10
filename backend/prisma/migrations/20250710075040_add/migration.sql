/*
  Warnings:

  - You are about to drop the column `priory_id` on the `todo` table. All the data in the column will be lost.
  - Added the required column `priority_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_priory_id_fkey`;

-- DropIndex
DROP INDEX `Todo_priory_id_fkey` ON `todo`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `priory_id`,
    ADD COLUMN `priority_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_priority_id_fkey` FOREIGN KEY (`priority_id`) REFERENCES `Priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
