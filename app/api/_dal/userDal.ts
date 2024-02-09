import db from "@/app/api/lib/mongodb";
import { REPOS, USERS } from "./collections";
import { WithId } from "mongodb";
import { userDetails } from "../auth/[...nextauth]/route";

interface user {
  name: string;
  email: string;
  userId: string;
  image: string;
  accessToken?: string;
}

export async function findUserById(id: string) {
  const user = (await db()).collection(USERS).findOne({ userId: id });
  return user || null;
}

export async function createUser(user: user) {
  (await db()).collection(USERS).insertOne(user);
}

export const getAccessToken = async (userId: string) => {
  const getDb = await db();

  const user = (await getDb
    .collection(USERS)
    .findOne({ userId: userId })) as WithId<userDetails>;

  return user.accessToken || null;
};
