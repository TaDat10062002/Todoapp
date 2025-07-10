/*
  Warnings:

  - You are about to drop the column `priority_id` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `todo` table. All the data in the column will be lost.
  - Added the required column `priorityId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_priority_id_fkey`;

-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_user_id_fkey`;

-- DropIndex
DROP INDEX `Todo_priority_id_fkey` ON `todo`;

-- DropIndex
DROP INDEX `Todo_status_id_fkey` ON `todo`;

-- DropIndex
DROP INDEX `Todo_user_id_fkey` ON `todo`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `priority_id`,
    DROP COLUMN `status_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `priorityId` INTEGER NOT NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_priorityId_fkey` FOREIGN KEY (`priorityId`) REFERENCES `Priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
