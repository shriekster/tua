import * as v from "valibot";

const LoginSchema = v.object({
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted.")
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more.")
  ),
});

type LoginData = v.InferOutput<typeof LoginSchema>;

export const parseLoginData = (data: unknown): LoginData =>
  v.parse(LoginSchema, data);
