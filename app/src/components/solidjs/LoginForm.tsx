import { login } from "@/services/ui/login";
import type { LoginData } from "@/types/ui";
import { Field as TextField } from "@ark-ui/solid/field";
import {
  createForm,
  minLength,
  required,
  type SubmitHandler,
} from "@modular-forms/solid";
import { navigate } from "astro:transitions/client";
import { HiOutlineEye, HiOutlineEyeSlash } from "solid-icons/hi";
import { createSignal } from "solid-js";
import HamsterProgress from "./HamsterProgress";

export default function LoginForm() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);
  const [isSubmitting, setSubmitting] = createSignal(false);

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
    setSubmitting(true);
    const isAuthenticated = await login(values);

    if (isAuthenticated) {
      navigate("/admin", { history: "replace" });
    } else {
      // showToast();
      setSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting() && <HamsterProgress />}
      <Form
        inert={isSubmitting()}
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
                class="h-[48px] w-full border-[1px] border-[#7f805d] rounded-sm p-0.5"
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
                  class="h-[48px] w-full border-[1px] border-[#7f805d] rounded-sm p-0.5"
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
                  class="rounded-full bg-transparent p-2 hover:bg-[#7f805d44] hover:bg-opacity-15 absolute right-[6px] top-[6px]"
                  onMouseDown={onPasswordVisibilityMouseDown}
                  onClick={onPasswordVisibilityButtonClick}
                >
                  {showPassword() ? (
                    <HiOutlineEyeSlash color="#7f805d" size={20} />
                  ) : (
                    <HiOutlineEye color="#7f805d" size={20} />
                  )}
                </button>
              )}
            </div>
          )}
        </Field>
        <button
          class="bg-[#7f805d] rounded-sm h-[36px] border-[#7f805d] transition-colors hover:border-[#7f805d] hover:border-[1px] hover:bg-transparent hover:text-[#7f805d] w-full"
          type="submit"
        >
          Login
        </button>
      </Form>
    </>
  );
}
