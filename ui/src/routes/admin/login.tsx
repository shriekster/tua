import {
  createForm,
  required,
  minLength,
  SubmitHandler,
} from "@modular-forms/solid";

import { ImageRoot, ImageFallback, Image } from "@/components/ui/image";

import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
  TextFieldErrorMessage,
} from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { FaRegularEyeSlash } from "solid-icons/fa";
import { FaRegularEye } from "solid-icons/fa";
import { HiOutlineEye } from "solid-icons/hi";
import { HiOutlineEyeSlash } from "solid-icons/hi";
import { createSignal, createEffect } from "solid-js";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);

  const [loginForm, { Form, Field }] = createForm<LoginForm>();

  let passwordInputRef: HTMLInputElement;

  const onPasswordVisibilityMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  };

  const onPasswordVisibilityButtonClick = (e: MouseEvent) => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onPasswordInputBlur = () => {
    setShowPasswordVisibilityButton(false);
    setShowPassword(false);
  };

  const onPasswordInputFocus = () => {
    setShowPasswordVisibilityButton(true);
  };

  const handleSubmit: SubmitHandler<LoginForm> = (values, event) => {
    event.preventDefault();

    console.debug({ values });
  };

  return (
    <main class="h-svh w-svw flex">
      <Form
        class="h-[64dvh] max-h-[512px] w-[300px] m-auto flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <ImageRoot>
          <Image src="/tua.webp" class="w-[300px]" alt="TUA" />
          <ImageFallback class="h-[128px] w-[300px] !rounded-none !bg-transparent">
            <div class="text-[#7f805d] text-[72px] text-center h-full w-full">
              TUA
            </div>
          </ImageFallback>
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
              value={field.value || ""}
            >
              <TextField
                {...props}
                class="h-[48px]"
                type="text"
                placeholder="Utilizator"
                autoComplete="username"
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
            minLength(8, "Parola este prea scurtă!"),
          ]}
        >
          {(field, props) => (
            <div class="relative flex w-full max-w-xs !h-[72px]">
              <TextFieldRoot
                class="w-full max-w-xs !h-[72px] absolute bottom-0 left-0 "
                validationState={field.error ? "invalid" : "valid"}
                value={field.value || ""}
              >
                <TextField
                  {...props}
                  class="h-[48px]"
                  type={showPassword() ? "text" : "password"}
                  placeholder="Parolă"
                  onFocus={onPasswordInputFocus}
                  onBlur={onPasswordInputBlur}
                  autoComplete="current-password"
                  ref={(element: HTMLInputElement) =>
                    (passwordInputRef = element)
                  }
                />

                <TextFieldErrorMessage forceMount={true} class="text-opacity-0">
                  {field.error}
                </TextFieldErrorMessage>
              </TextFieldRoot>
              {showPasswordVisibilityButton() && (
                <Button
                  tabIndex={-1}
                  type="button"
                  class="rounded-full bg-transparent p-2 hover:bg-white hover:bg-opacity-15 absolute right-[6px] top-[6px]"
                  onMouseDown={onPasswordVisibilityMouseDown}
                  onClick={onPasswordVisibilityButtonClick}
                >
                  {showPassword() ? (
                    <HiOutlineEyeSlash color="white" size={20} />
                  ) : (
                    <HiOutlineEye color="white" size={20} />
                  )}
                </Button>
              )}
            </div>
          )}
        </Field>
        <Button
          class="bg-[#7f805d] border-[#7f805d] transition-colors hover:border-[#7f805d] hover:border-[1px] hover:bg-transparent hover:text-[#7f805d]"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </main>
  );
}