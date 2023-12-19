import { useInfiniteQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}
const getIssues = async ({
  queryKey,
  pageParam = 1,
}: QueryProps): Promise<Issue[]> => {
  const params = new URLSearchParams();

  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }
  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ labels, page, state }: Props) => {
  const issuesInfiniteQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: getIssues,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1;
    },
  });

  return { issuesInfiniteQuery };
};
