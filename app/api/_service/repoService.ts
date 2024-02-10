import { getRepos, selectRepos } from "../_dal/reposDal";

export const getReposService = async (userId: string) => {
  const repoList = await getRepos(userId);

  return repoList;
};

export const selectRepoService = async (repos: string[], userId: string) => {
  await selectRepos(repos, userId);
};
