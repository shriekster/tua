import * as v from "valibot";

const LoginSchema = v.object({
  username: v.pipe(
    v.string("Your username must be a string."),
    v.nonEmpty("Please enter your username."),
    v.minLength(3, "Your username must have 3 characters or more."),
    v.maxLength(
      64,
      "Your username exceeds the maximum allowed length of 64 characters."
    )
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more."),
    v.maxLength(
      64,
      "Your password exceeds the maximum allowed length of 64 characters."
    )
  ),
});

export const parseLoginData = (data: unknown) => v.safeParse(LoginSchema, data);
