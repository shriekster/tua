import { login } from "@/services/ui/login";
import type { LoginData } from "@/types/ui";

import {
  createForm,
  minLength,
  required,
  type SubmitHandler,
} from "@modular-forms/solid";
import { navigate } from "astro:transitions/client";
import { createSignal } from "solid-js";
import HamsterProgress from "./HamsterProgress";
import TextField from "./TextField";

export default function LoginForm() {
  const [isSubmitting, setSubmitting] = createSignal(false);

  const [loginForm, { Form, Field }] = createForm<LoginData>();

  const handleSubmit: SubmitHandler<LoginData> = async (values, event) => {
    console.log("SUBMITTING");
    event.preventDefault();
    setSubmitting(true);
    const isAuthenticated = await login(values);

    if (isAuthenticated) {
      navigate("/admin", { history: "replace" });
    } else {
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
        <img
          src="/tua.webp"
          class="!h-[128px] !w-[300px] shrink-0"
          alt="TUA"
          decoding="async"
          loading="lazy"
        />
        <Field
          name="username"
          validate={[
            required("Introdu numele de utilizator"),
            minLength(3, "Numele este prea scurt!"),
          ]}
        >
          {(field, props) => (
            <TextField
              {...props}
              class="border-[1px] border-[#7f805d] rounded-sm p-0.5"
              size="xl"
              fullWidth
              placeholder="Utilizator"
              autocomplete="username"
              value={field.value || ""}
              error={field.error}
              required
            />
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
            <TextField
              {...props}
              class="border-[1px] border-[#7f805d] rounded-sm p-0.5"
              fullWidth
              type="password"
              placeholder="Parolă"
              autocomplete="current-password"
              value={field.value || ""}
              error={field.error}
              size="sm"
              color="error"
              required
            />
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
