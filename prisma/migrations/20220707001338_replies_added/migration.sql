/*
  Warnings:

  - Added the required column `reply_to` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reply_to" VARCHAR(25) NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reply_to_fkey" FOREIGN KEY ("reply_to") REFERENCES "Comment"("comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
