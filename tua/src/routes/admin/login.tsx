import { createForm, required, minLength, value } from "@modular-forms/solid";

import { ImageRoot, ImageFallback, Image } from "@/components/ui/image";
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
  TextFieldErrorMessage,
} from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const [loginForm, { Form, Field }] = createForm<LoginForm>();
  return (
    <main class="h-svh w-svw flex">
      <Form class="h-[64dvh] max-h-[512px] w-[300px] m-auto flex flex-col justify-between">
        <ImageRoot fallbackDelay={500}>
          <Image src="/tua.webp" class="w-[300px]" />
          <ImageFallback>TUA</ImageFallback>
        </ImageRoot>
        <Field
          name="username"
          validate={[
            required("Introdu numele de utilizator"),
            minLength(3, "Numele este prea scurt!"),
          ]}
        >
          {(field, props) => (
            <TextFieldRoot
              class="w-full max-w-xs !h-[64px]"
              validationState={field.error ? "invalid" : "valid"}
            >
              <TextField
                {...props}
                type="text"
                placeholder="Utilizator"
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
        <Field
          name="password"
          validate={[
            required("Introdu parola"),
            minLength(3, "Parola este prea scurtă!"),
          ]}
        >
          {(field, props) => (
            <TextFieldRoot
              class="w-full max-w-xs !h-[64px]"
              validationState={field.error ? "invalid" : "valid"}
            >
              <TextField
                {...props}
                type="text"
                placeholder="Parolă"
                on:input={(e) => {
                  console.debug(e.target.value);
                }}
              />
              <TextFieldErrorMessage forceMount={true} class="text-opacity-0">
                {field.error}
              </TextFieldErrorMessage>
            </TextFieldRoot>
          )}
        </Field>
        <Button class="bg-[#7f805d]" type="submit">
          Login
        </Button>
      </Form>
    </main>
  );
}
