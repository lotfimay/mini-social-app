-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reply_to_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "reply_to" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reply_to_fkey" FOREIGN KEY ("reply_to") REFERENCES "Comment"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;
