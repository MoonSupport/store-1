const fetcher =
  <P>(buildParams: (params: P) => string) =>
  async <R>(params: P, init?: RequestInit): Promise<R> => {
    const path = buildParams(params);
    const raw = await fetch(path, init);
    const data = await raw.json();
    return data;
  };

export default fetcher;
