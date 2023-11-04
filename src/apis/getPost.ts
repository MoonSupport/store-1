import fetcher from "../fether";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Params {
  path: {
    id: number;
  };
}

const buildParams = ({ path }: Params) => {
  return `${BASE_URL}/posts/${path.id}`;
};

export const getPosts = fetcher(buildParams);
