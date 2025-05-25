/*
  Warnings:

  - You are about to drop the column `is_done` on the `Task` table. All the data in the column will be lost.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "is_done",
ADD COLUMN     "status" TEXT NOT NULL;
