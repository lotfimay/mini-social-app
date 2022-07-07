/*
  Warnings:

  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "author_id" VARCHAR(25) NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(25) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
