/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `post_id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "post_id" SET DATA TYPE VARCHAR(25),
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id");

-- CreateTable
CREATE TABLE "Reaction" (
    "user_id" VARCHAR(25) NOT NULL,
    "post_id" VARCHAR(25) NOT NULL,
    "is_like" BOOLEAN NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("post_id","user_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" VARCHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" VARCHAR(25) NOT NULL,
    "post_id" VARCHAR(25) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
