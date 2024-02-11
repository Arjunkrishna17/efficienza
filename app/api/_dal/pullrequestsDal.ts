import db from "../lib/mongodb";
import { PULLREQUESTS } from "./collections";

export const insertPullRequests = async (
  pullRequests: any,
  userId: string,
  repo: string
) => {
  const getDb = await db();

  const bulkOps = [];

  for (const pullRequest of pullRequests) {
    bulkOps.push({
      updateOne: {
        filter: { id: pullRequest.id },
        update: { $set: { ...pullRequest, userId: userId } },
        upsert: true,
      },
    });
  }

  const bulkWriteResult = await getDb
    .collection(PULLREQUESTS)
    .bulkWrite(bulkOps);

  console.info(
    `${bulkWriteResult.upsertedCount} new documents inserted, for user ${userId} of repo ${repo}`
  );
  console.info(
    `${bulkWriteResult.modifiedCount} existing documents updated, for user ${userId} ${repo}`
  );
};
