import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { getAccessToken } from "../../_dal/userDal";
import { fetcher } from "../../lib/fetch";
import { GET_REPOS } from "@/config/externalAPI";
import { getReposService } from "../../_service/repoService";
import { saveRepos } from "../../_dal/reposDal";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  const userId = token?.sub;

  if (!userId) {
    throw new Error(`Params missing User Id`);
  }

  const accessToken = await getAccessToken(userId);

  if (!accessToken) {
    throw new Error(`No access token found for user: ${userId}`);
  }

  const response = await fetcher(GET_REPOS, accessToken);

  await saveRepos(response);

  const repos = await getReposService(userId);

  return NextResponse.json(repos, {
    status: 200,
  });
};
