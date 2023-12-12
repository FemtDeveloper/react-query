import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../api/helpers/time";
import { Label } from "../interfaces";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Label[]>("/labels");
  console.log({ data });
  return data;
};

export const useLabels = () => {
  const labelQuery = useQuery(["labels"], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 180616330,
        node_id: "MDU6TGFiZWwxODA2MTYzMzA=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler",
        name: "Component: Optimizing Compiler",
        color: "bfdadc",
        default: false,
      },
    ],
  });

  return { labelQuery };
};
