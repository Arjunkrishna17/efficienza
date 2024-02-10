import db from "@/app/api/lib/mongodb";
import { REPOS } from "./collections";

export const getRepos = async (userId: string) => {
  const getDb = await db();

  const repos = await getDb
    .collection(REPOS)
    .aggregate([
      {
        $match: {
          "owner.id": Number(userId),
        },
      },
      {
        $project: {
          _id: 0,
          id: "$id",
          name: "$name",
          ownerId: "$owner.id",
          ownerName: "$owner.login",
          selected: 1,
        },
      },
    ])
    .toArray();

  return repos;
};

export const saveRepos = async (repos: any, userId: string) => {
  const getDb = await db();

  const bulkOps = repos.map((obj: any) => ({
    updateMany: {
      filter: {
        $and: [{ id: obj.id }, { "owner.id": Number(userId) }],
      },
      update: { $set: { ...obj } },
      upsert: true,
    },
  }));

  await getDb.collection(REPOS).bulkWrite(bulkOps);
};

export const selectRepos = async (repos: string[], userId: string) => {
  const getDb = await db();

  const bulkUpdateOps = [];

  // Update documents where repo ID is in selectedRepoIds and set selected to true
  bulkUpdateOps.push({
    updateMany: {
      filter: { id: { $in: repos }, "owner.id": Number(userId) },
      update: { $set: { selected: true } },
    },
  });

  // Update documents where repo ID is not in selectedRepoIds and set selected to false
  bulkUpdateOps.push({
    updateMany: {
      filter: { id: { $nin: repos }, "owner.id": Number(userId) },
      update: { $set: { selected: false } },
    },
  });

  await getDb.collection(REPOS).bulkWrite(bulkUpdateOps);

  console.info("Repos of user " + userId + " updated");
};
