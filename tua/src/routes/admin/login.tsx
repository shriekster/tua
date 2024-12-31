import { createForm, required, email, minLength } from "@modular-forms/solid";

import { ImageRoot, ImageFallback, Image } from "@/components/ui/image";
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
  TextFieldErrorMessage,
} from "@/components/ui/textfield";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginForm, { Form, Field }] = createForm<LoginForm>();
  return (
    <main>
      <Form>
        <ImageRoot>
          <Image src="/tua.webp" class="w-[300px]" />
          <ImageFallback>TUA</ImageFallback>
        </ImageRoot>
        <Field
          name="email"
          validate={[
            required("Please enter your email."),
            email("The email address is badly formatted."),
          ]}
        >
          {(field, props) => (
            <TextFieldRoot
              class="w-full max-w-xs"
              validationState={field.error ? "invalid" : "valid"}
            >
              <TextFieldLabel>Email</TextFieldLabel>
              <TextField
                {...props}
                type="email"
                placeholder="Email"
                on:input={(e) => {
                  console.debug(e.target.value);
                }}
              />
              <TextFieldErrorMessage>
                {field.error ?? " "}
              </TextFieldErrorMessage>
            </TextFieldRoot>
          )}
        </Field>
        <button type="submit">Login</button>
      </Form>
    </main>
  );
}
