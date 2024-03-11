/*
  Warnings:

  - You are about to drop the `ChatsUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatsUsers" DROP CONSTRAINT "ChatsUsers_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatsUsers" DROP CONSTRAINT "ChatsUsers_user_id_fkey";

-- DropTable
DROP TABLE "ChatsUsers";

-- CreateTable
CREATE TABLE "chats_users" (
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "chats_users_pkey" PRIMARY KEY ("user_id","chat_id")
);

-- AddForeignKey
ALTER TABLE "chats_users" ADD CONSTRAINT "chats_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats_users" ADD CONSTRAINT "chats_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
