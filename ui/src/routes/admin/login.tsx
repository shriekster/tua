import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  createForm,
  required,
  minLength,
  SubmitHandler,
} from "@modular-forms/solid";
import { HiOutlineEye } from "solid-icons/hi";
import { HiOutlineEyeSlash } from "solid-icons/hi";
import { ImageRoot, ImageFallback, Image } from "@/components/ui/image";
import {
  TextField,
  TextFieldRoot,
  TextFieldErrorMessage,
} from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { toaster } from "@kobalte/core";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";
import CustomLoader from "@/components/CustomLoader";
import { login } from "@/services/admin";
import type { Login } from "@/types/auth";

export default function Login() {
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);

  const navigate = useNavigate();

  const [loginForm, { Form, Field }] = createForm<Login>();

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

  const showToast = () => {
    toaster.show((props) => (
      <Toast toastId={props.toastId} variant="destructive">
        <ToastContent>
          <ToastTitle>Ups!</ToastTitle>
          <ToastDescription>
            Ai greșit utilizatorul sau parola!
          </ToastDescription>
        </ToastContent>
      </Toast>
    ));
  };

  const handleSubmit: SubmitHandler<Login> = async (values, event) => {
    event.preventDefault();

    const isAuthenticated = await login(values);

    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    } else {
      showToast();
    }
  };

  return (
    <main class="h-[100dvh] content-center relative">
      {loginForm.submitting && <CustomLoader />}
      <Form
        inert={loginForm.submitting}
        class="!h-[400px] w-[300px] m-auto flex flex-col items-center justify-between overflow-y-auto !p-[8px] transition-opacity"
        onSubmit={handleSubmit}
      >
        <ImageRoot>
          <Image
            src="/tua.webp"
            class="!h-[128px] !w-[300px] shrink-0"
            alt="TUA"
          />
          <ImageFallback class="!h-[128px] !w-[300px] !rounded-none !bg-transparent">
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
                class="w-full max-w-xs !h-[72px] absolute bottom-0 left-0"
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
          class="bg-[#7f805d] border-[#7f805d] transition-colors hover:border-[#7f805d] hover:border-[1px] hover:bg-transparent hover:text-[#7f805d] w-full"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </main>
  );
}
