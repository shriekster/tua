import { getColorClassMap, getSizeClassMap } from "@/lib/utils";
import type { Color, Size } from "@/types/ui";
import clsx from "clsx";
import { HiOutlineEye, HiOutlineEyeSlash } from "solid-icons/hi";
import { createSignal, Match, Show, splitProps, Switch } from "solid-js";
import IconButton from "./IconButton";

type TextFieldProps = {
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  size?: Size;
  color?: Color;
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

const colorClassMap = getColorClassMap("input");
const sizeClassMap = getSizeClassMap("input");

const TextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);

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

  const isPassword = () => local?.type === "password";
  const isFullWidth = () => local?.fullWidth;

  const onPasswordVisibilityMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  };

  const onPasswordVisibilityButtonClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onBlur = () => {
    if (isPassword()) {
      setShowPasswordVisibilityButton(false);
      setShowPassword(false);
    }
  };

  const onFocus = () => {
    if (isPassword()) {
      setShowPasswordVisibilityButton(true);
    }
  };

  const type = () =>
    isPassword()
      ? showPassword()
        ? "text"
        : "password"
      : local.type ?? "text";
  const sizeClass = () => sizeClassMap[local?.size ?? "md"];
  const colorClass = () =>
    local.error ? "input-error" : colorClassMap[local?.color ?? "primary"];
  const containerClass = () => clsx("relative", isFullWidth() && "w-full");
  const labelClass = () =>
    clsx(
      "relative",
      "flex",
      "items-center",
      "pb-[24px]",
      isFullWidth() && "w-full"
    );
  const inputClass = () =>
    clsx(
      "input",
      colorClass(),
      sizeClass(),
      local.fullWidth && "w-full",
      "p-[8px]",
      isPassword() && "pr-[40px]",
      local.class,
      "focus:outline-none"
    );
  const iconColor = () => (local?.error ? "error" : local?.color ?? "primary");

  return (
    <div class={containerClass()}>
      <label class={labelClass()} for={local.name}>
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
          <IconButton
            tabIndex={-1}
            color={iconColor()}
            class="p-2 absolute right-0 z-10"
            onMouseDown={onPasswordVisibilityMouseDown}
            onClick={onPasswordVisibilityButtonClick}
          >
            <Switch>
              <Match when={showPassword()}>
                <HiOutlineEyeSlash size={20} />
              </Match>
              <Match when={!showPassword()}>
                <HiOutlineEye size={20} />
              </Match>
            </Switch>
          </IconButton>
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
