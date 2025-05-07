import clsx from "clsx";
import { HiOutlineEye, HiOutlineEyeSlash } from "solid-icons/hi";
import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  Show,
  splitProps,
  Switch,
} from "solid-js";

const baseInputClass = "input";

type TextFieldProps = {
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  disabled?: boolean;
  fullWidth?: boolean;
  class?: string;
  value?: string;
  placeholder?: string;
  autocomplete?: string;
  error?: string;
  required?: boolean;
  name: string;
};

const TextField = (props: TextFieldProps) => {
  const [local, inputProps] = splitProps(props, [
    "type",
    "size",
    "color",
    "disabled",
    "fullWidth",
    "autocomplete",
    "placeholder",
    "value",
    "class",
    "error",
    "name",
  ]);

  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);

  const onPasswordVisibilityMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  };

  const onPasswordVisibilityButtonClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onBlur =
    local.type === "password"
      ? () => {
          setShowPasswordVisibilityButton(false);
          setShowPassword(false);
        }
      : undefined;

  const onFocus =
    local.type === "password"
      ? () => {
          setShowPasswordVisibilityButton(true);
        }
      : undefined;

  const type = createMemo(() => {
    if (local.type === "password") {
      return showPassword() ? "text" : "password";
    }

    return local.type ?? "text";
  });

  const sizeClass = baseInputClass + "-" + local.size;
  const colorClass = createMemo(
    () =>
      baseInputClass +
      "-" +
      (local?.error ? "error" : local?.color ?? "primary")
  );
  const fullWidthClass = local.fullWidth ? "w-full" : "";
  const containerClass = clsx("relative", local?.fullWidth && "w-full");
  const labelClass = clsx(
    "relative",
    "flex",
    "items-center",
    "pb-[24px]",
    local?.fullWidth && "w-full"
  );
  const inputClass = createMemo(() =>
    clsx(
      baseInputClass,
      sizeClass,
      colorClass(),
      fullWidthClass,
      "p-[8px]",
      local.type === "password" && "pr-[40px]",
      local.class,
      "focus:outline-none"
    )
  );

  createEffect(() =>
    console.log({ colorClass: colorClass(), inputClass: inputClass() })
  );

  return (
    <div class={containerClass}>
      <label class={labelClass} for={local.name}>
        <input
          name={local.name}
          placeholder={local.placeholder}
          autocomplete={local.autocomplete}
          disabled={local.disabled}
          value={local.value}
          type={type()}
          onFocus={onFocus}
          onBlur={onBlur}
          class={inputClass()}
          autocorrect="off"
          {...inputProps}
        />
        <Show when={showPasswordVisibilityButton()}>
          <button
            tabIndex={-1}
            type="button"
            class="rounded-full bg-transparent p-2 hover:bg-[#7f805d44] hover:bg-opacity-15 absolute right-0 z-10"
            onMouseDown={onPasswordVisibilityMouseDown}
            onClick={onPasswordVisibilityButtonClick}
          >
            <Switch>
              <Match when={showPassword()}>
                <HiOutlineEyeSlash color="#7f805d" size={20} />
              </Match>
              <Match when={!showPassword()}>
                <HiOutlineEye color="#7f805d" size={20} />
              </Match>
            </Switch>
          </button>
        </Show>
      </label>
      <Show when={!!local.error}>
        <p class="absolute left-0 bottom-0 text-sm text-red-500">
          {local.error}
        </p>
      </Show>
    </div>
  );
};

export default TextField;
