/*
  Warnings:

  - Added the required column `disLikesNumber` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likesNumber` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disLikesNumber` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likesNumber` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "disLikesNumber" INTEGER NOT NULL,
ADD COLUMN     "likesNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "disLikesNumber" INTEGER NOT NULL,
ADD COLUMN     "likesNumber" INTEGER NOT NULL;
