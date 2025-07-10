/*
  Warnings:

  - You are about to drop the column `isDone` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `todo` table. All the data in the column will be lost.
  - Added the required column `priory_id` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `isDone`,
    DROP COLUMN `userId`,
    ADD COLUMN `priory_id` INTEGER NOT NULL,
    ADD COLUMN `status_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Priority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_priory_id_fkey` FOREIGN KEY (`priory_id`) REFERENCES `Priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
