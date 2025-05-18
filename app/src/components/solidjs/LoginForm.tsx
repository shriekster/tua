import { login } from "@/services/ui/login";
import type { LoginData } from "@/types/ui";

import content from "@/lib/content";
import {
  createForm,
  minLength,
  required,
  type SubmitHandler,
} from "@modular-forms/solid";
import { navigate } from "astro:transitions/client";
import { createSignal, Show } from "solid-js";
import tua from "../../assets/tua.webp";
import Button from "./Button";
import HamsterProgress from "./HamsterProgress";
import TextField from "./TextField";

export default function LoginForm() {
  const [isSubmitting, setSubmitting] = createSignal(false);

  const [loginForm, { Form, Field }] = createForm<LoginData>();

  const handleSubmit: SubmitHandler<LoginData> = async (values, event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const isAuthenticated = await login(values);

      if (isAuthenticated) {
        navigate("/admin", { history: "replace" });
      }
    } catch (error) {
      console.error("🚨", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Show when={isSubmitting()}>
        <HamsterProgress />
      </Show>
      <Form
        inert={isSubmitting()}
        class="!h-[400px] w-[300px] m-auto flex flex-col items-center justify-between overflow-y-auto !p-[8px] transition-opacity"
        onSubmit={handleSubmit}
      >
        <img
          src={tua.src}
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
          validateOn="input"
        >
          {(field, props) => (
            <TextField
              {...props}
              fullWidth
              placeholder="Utilizator"
              autocomplete="username"
              value={field.value}
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
          validateOn="input"
        >
          {(field, props) => (
            <TextField
              {...props}
              fullWidth
              type="password"
              placeholder="Parolă"
              autocomplete="current-password"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Button
          // class="bg-[#7f805d] rounded-sm h-[36px] border-[#7f805d] transition-colors hover:border-[#7f805d] hover:border-[1px] hover:bg-transparent hover:text-[#7f805d] w-full"
          type="submit"
          fullWidth
          label={content("login")}
        />
      </Form>
    </>
  );
}
