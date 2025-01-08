export const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, milliseconds);
  });
