import { defineMiddleware } from "astro:middleware";

// TODO: logging, authorization
export const onRequest = defineMiddleware((context, next) => {
  console.log("MIDDLEWARE", context.url.toString());

  next();
});
