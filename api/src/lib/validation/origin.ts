import * as v from "valibot";

const OriginSchema = v.pipe(
  v.string(),
  v.nonEmpty("Please enter your url."),
  v.url("The url is badly formatted.")
);

export const parseOrigin = (data: unknown) => v.safeParse(OriginSchema, data);
