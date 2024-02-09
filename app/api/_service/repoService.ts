import { getRepos } from "../_dal/reposDal";

export const getReposService = async (userId: string) => {
  const repoList = await getRepos(userId);

  return repoList;
};
