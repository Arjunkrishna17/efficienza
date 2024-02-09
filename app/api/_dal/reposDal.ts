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
        },
      },
    ])
    .toArray();

  return repos;
};

export const saveRepos = async (repos: any) => {
  const getDb = await db();

  const bulkOps = repos.map((obj: any) => ({
    updateMany: {
      filter: { id: obj.id },
      update: { $set: { ...obj } },
      upsert: true,
    },
  }));

  await getDb.collection(REPOS).bulkWrite(bulkOps);
};
