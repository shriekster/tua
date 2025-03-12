export const getRequestBody = async (request: Request) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      return body;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return null;
};
