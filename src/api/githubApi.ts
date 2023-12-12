import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});
