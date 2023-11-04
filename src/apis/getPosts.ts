import fetcher from "../fether";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Params {
  query?: {
    userId: number;
  };
}

const buildParams = ({ query }: Params) => {
  if (!query) return `${BASE_URL}/posts`;
  const querystring = Object.entries(query).reduce(
    (prev, [key, value]) => ({ ...prev, [key]: value.toString() }),
    {}
  );
  return `${BASE_URL}/posts?${new URLSearchParams(querystring).toString()}`;
};

export const getPosts = fetcher(buildParams);
