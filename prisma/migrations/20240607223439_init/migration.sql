-- CreateTable
CREATE TABLE "ticketsGuild" (
    "guildId" TEXT NOT NULL PRIMARY KEY,
    "selectMenuOptions" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ticketsInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channelid" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ticketsInfo_channelid_key" ON "ticketsInfo"("channelid");
