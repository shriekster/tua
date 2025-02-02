import { navigate } from "astro:transitions/client";
import { createSignal } from "solid-js";
import {
  createForm,
  required,
  minLength,
  type SubmitHandler,
} from "@modular-forms/solid";
import { HiOutlineEye } from "solid-icons/hi";
import { HiOutlineEyeSlash } from "solid-icons/hi";
import { Field as TextField } from "@ark-ui/solid/field";
import { login } from "@/services/ui/login";
import type { LoginData } from "@/types/ui";
import HamsterProgress from "./HamsterProgress";

export default function LoginForm() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);

  const [loginForm, { Form, Field }] = createForm<LoginData>();

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

  const handleSubmit: SubmitHandler<LoginData> = async (values, event) => {
    event.preventDefault();

    const isAuthenticated = await login(values);

    if (isAuthenticated) {
      navigate("/admin", { history: "replace" });
    } else {
      // showToast();
    }
  };

  return (
    <>
      {loginForm.submitting && <HamsterProgress />}
      <Form
        inert={loginForm.submitting}
        class="!h-[400px] w-[300px] m-auto flex flex-col items-center justify-between overflow-y-auto !p-[8px] transition-opacity"
        onSubmit={handleSubmit}
      >
        <img src="/tua.webp" class="!h-[128px] !w-[300px] shrink-0" alt="TUA" />
        <Field
          name="username"
          validate={[
            required("Introdu numele de utilizator"),
            minLength(3, "Numele este prea scurt!"),
          ]}
        >
          {(field, props) => (
            <TextField.Root class="w-full !h-[64px]" invalid={!!field.error}>
              <TextField.Input
                {...props}
                class="h-[48px] w-full"
                type="text"
                placeholder="Utilizator"
                autocomplete="username"
                value={field.value || ""}
              />
              <TextField.ErrorText class="block text-red-500">
                {field.error ?? " "}
              </TextField.ErrorText>
            </TextField.Root>
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
              <TextField.Root
                class="w-full max-w-xs !h-[72px] absolute bottom-0 left-0"
                invalid={!!field.error}
              >
                <TextField.Input
                  {...props}
                  class="h-[48px] w-full"
                  type={showPassword() ? "text" : "password"}
                  placeholder="Parolă"
                  onFocus={onPasswordInputFocus}
                  onBlur={onPasswordInputBlur}
                  autocomplete="current-password"
                  value={field.value || ""}
                />

                <TextField.ErrorText class="block text-red-500">
                  {field.error ?? " "}
                </TextField.ErrorText>
              </TextField.Root>
              {showPasswordVisibilityButton() && (
                <button
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
                </button>
              )}
            </div>
          )}
        </Field>
        <button
          class="bg-[#7f805d] border-[#7f805d] transition-colors hover:border-[#7f805d] hover:border-[1px] hover:bg-transparent hover:text-[#7f805d] w-full"
          type="submit"
        >
          Login
        </button>
      </Form>
    </>
  );
}
