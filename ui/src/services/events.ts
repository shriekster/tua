export const subscribe = (url: string) => {
  const controller = new AbortController();
  const eventSource = new EventSource(url, {
    withCredentials: true,
  });

  return { eventSource, controller };
};
