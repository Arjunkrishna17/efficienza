import { GIT_HUB_BASE_URL } from "@/config/externalAPI";
import { getRepos, selectRepos } from "../_dal/reposDal";
import { fetcher } from "../lib/fetch";
import { getAccessToken } from "../_dal/userDal";
import { selectedRepos } from "../_types/repos";

export const getReposService = async (userId: string) => {
  const repoList = await getRepos(userId);

  return repoList;
};

export const selectRepoService = async (repos: string[], userId: string) => {
  await selectRepos(repos, userId);
};
