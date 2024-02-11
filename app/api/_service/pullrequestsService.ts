import { GIT_HUB_BASE_URL } from "@/config/externalAPI";
import { getSelectedRepos } from "../_dal/reposDal";
import { getAccessToken } from "../_dal/userDal";
import { selectedRepos } from "../_types/repos";
import { fetcher } from "../lib/fetch";
import { insertPullRequests } from "../_dal/pullrequestsDal";

export const syncPrsService = async (userId: string) => {
  const selectedRepos = await getSelectedRepos(userId);

  await getPrsFromGitHub(selectedRepos, userId);
};

const getPrsFromGitHub = async (repos: selectedRepos[], userId: string) => {
  try {
    const accessToken = await getAccessToken(userId);

    for (const repo of repos) {
      let page = 1;
      let hasNextPage = true;

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      while (hasNextPage) {
        const url = `https://api.github.com/repos/${repo.ownerName}/${repo.name}/pulls?state=all&per_page=100&page=${page}`;

        const response = await fetcher(url, accessToken as string);

        if (!response.ok) {
          hasNextPage = false;
          throw new Error(
            "Failed to fetch pull request of repo " +
              repo.name +
              " of userId: " +
              userId
          );
        }

        const pullRequests = await response.json();

        if (pullRequests.length === 0) {
          console.info("No pull requests found for " + repo.name);
          return;
        }

        await insertPullRequests(pullRequests, userId, repo.name);

        const header = response.headers.get("link");

        if (header) {
          hasNextPage = /rel="next"/.test(header) && page < 3; //For now it will analyze upto 200 prs
        } else {
          hasNextPage = false;
        }

        page++;
      }
    }
  } catch (error) {
    console.error("Error fetching pull requests: ", error);
  }
};
