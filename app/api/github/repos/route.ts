import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { getAccessToken } from "../../_dal/userDal";
import { fetcher } from "../../lib/fetch";
import { GET_REPOS } from "@/config/externalAPI";
import { getReposService, selectRepoService } from "../../_service/repoService";
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

  if (!response.ok) {
    throw new Error(
      "Failed to fetch repos for user: " +
        userId +
        " status: " +
        response.status
    );
  }

  const repoFromGit = await response.json();

  await saveRepos(repoFromGit, userId);

  const repos = await getReposService(userId);

  return NextResponse.json(repos, {
    status: 200,
  });
};

export const PUT = async (req: any, res: NextApiResponse) => {
  const token = await getToken({ req });

  const userId = token?.sub;

  if (!userId) {
    throw new Error(`Params missing User Id`);
  }

  const { repos } = await req.json();

  await selectRepoService(repos, userId);

  return NextResponse.json("Success", {
    status: 200,
  });
};
