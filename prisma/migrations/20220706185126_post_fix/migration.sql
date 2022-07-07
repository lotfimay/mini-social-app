/*
  Warnings:

  - You are about to drop the column `post_tile` on the `Post` table. All the data in the column will be lost.
  - Added the required column `post_title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_tile",
ADD COLUMN     "post_title" TEXT NOT NULL;
