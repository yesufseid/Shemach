/*
  Warnings:

  - You are about to drop the column `date` on the `lottery` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `lottery` table. All the data in the column will be lost.
  - You are about to drop the column `numberofitem` on the `lottery` table. All the data in the column will be lost.
  - You are about to drop the column `numberofitemeachusertake` on the `lottery` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lottery_attempts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lottery_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lottery_validnumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lottery_validuser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_count` to the `Lottery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_name` to the `Lottery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_per_person` to the `Lottery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picked_user` to the `Lottery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lottery_attempts` DROP FOREIGN KEY `Lottery_attempts_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `lottery_user` DROP FOREIGN KEY `Lottery_user_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `lottery_validnumber` DROP FOREIGN KEY `Lottery_validnumber_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `lottery_validuser` DROP FOREIGN KEY `Lottery_validuser_authorId_fkey`;

-- AlterTable
ALTER TABLE `lottery` DROP COLUMN `date`,
    DROP COLUMN `item`,
    DROP COLUMN `numberofitem`,
    DROP COLUMN `numberofitemeachusertake`,
    ADD COLUMN `item_count` INTEGER NOT NULL,
    ADD COLUMN `item_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `item_per_person` INTEGER NOT NULL,
    ADD COLUMN `picked_user` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'USER', 'OBSERVER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `lottery_attempts`;

-- DropTable
DROP TABLE `lottery_user`;

-- DropTable
DROP TABLE `lottery_validnumber`;

-- DropTable
DROP TABLE `lottery_validuser`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
