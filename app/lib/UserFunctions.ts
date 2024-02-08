import UserModel from "../models/UserModal";
import connectDB from "./MongoDb";

interface user {
  name: string;
  email: string;
  userId: string;
  image: string;
  accessToken?: string;
}

export async function findUserById(id: string) {
  await connectDB();
  return await UserModel.findOne({ userId: id });
}

export async function createUser(user: user) {
  await connectDB();
  const result = await UserModel.create(user);
}
