import { ZodSchema, z } from "zod";
import fetcher from "./fether";

const fetchZodT =
  <Schema extends ZodSchema>(schema: Schema) =>
  <P>(buildParams: (params: P) => string) =>
  async (params: P, init?: RequestInit): Promise<z.infer<typeof schema>> => {
    return new Promise((resolve, reject) => {
      fetcher(buildParams)(params, init)
        .then((v) => {
          resolve(schema.parse(v));
        })
        .catch(reject);
    });
  };

const schema = z.array(
  z.object({
    body: z.string(),
    id: z.number(),
    title: z.string(),
    userId: z.string(),
  })
);

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Params {
  query?: {
    userId: number;
  };
}

const _fetcher = fetchZodT(schema);

const buildParams = ({ query }: Params) => {
  if (!query) return `${BASE_URL}/posts`;
  const querystring = Object.entries(query).reduce(
    (prev, [key, value]) => ({ ...prev, [key]: value.toString() }),
    {}
  );
  return `${BASE_URL}/posts?${new URLSearchParams(querystring).toString()}`;
};

export const getPostsWithZod = _fetcher(buildParams);

export default fetchZodT;
