-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "communityId" VARCHAR(25);

-- CreateTable
CREATE TABLE "Category" (
    "categortId" VARCHAR(25) NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categortId")
);

-- CreateTable
CREATE TABLE "Community" (
    "communityId" VARCHAR(25) NOT NULL,
    "communityName" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "categoryId" VARCHAR(25) NOT NULL,
    "creatorId" VARCHAR(25) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("communityId")
);

-- CreateTable
CREATE TABLE "CommunitiesUsers" (
    "userId" VARCHAR(25) NOT NULL,
    "communityId" VARCHAR(25) NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunitiesUsers_pkey" PRIMARY KEY ("userId","communityId")
);

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunitiesUsers" ADD CONSTRAINT "CommunitiesUsers_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunitiesUsers" ADD CONSTRAINT "CommunitiesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE SET NULL ON UPDATE CASCADE;
