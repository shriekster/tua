import { BASE_INPUT_CLASS } from "@/constants/ui";
import clsx from "clsx";
import { HiOutlineEye, HiOutlineEyeSlash } from "solid-icons/hi";
import { createEffect, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

type TextFieldProps = {
  variant?: "outlined" | "ghost";
  // type?: Omit<
  //   JSX.IntrinsicElements["input"]["type"],
  //   "checkbox" | "radio" | "file" | "range"
  // >;
  type?: JSX.IntrinsicElements["input"]["type"];
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
  value: string;
  placeholder?: string;
  autocomplete?: string;
} & Omit<JSX.IntrinsicElements["input"], "type" | "value">;

const TextField = (props: TextFieldProps) => {
  const [local, inputProps] = splitProps(props, [
    "variant",
    "type",
    "size",
    "color",
    "disabled",
    "fullWidth",
    "autocomplete",
    "placeholder",
    "value",
    "class",
  ]);

  const [showPassword, setShowPassword] = createSignal(false);
  const [showPasswordVisibilityButton, setShowPasswordVisibilityButton] =
    createSignal(false);
  const [inputType, setInputType] = createSignal(local.type);

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

  createEffect(() => {
    if (local.type === "password") {
      setInputType(showPassword() ? "text" : "password");
    }
  });

  const variantClass =
    local.variant === "ghost" ? BASE_INPUT_CLASS + "-" + local.variant : "";
  const sizeClass = BASE_INPUT_CLASS + "-" + local.size;
  const colorClass = local.color ? BASE_INPUT_CLASS + "-" + local.color : "";
  const fullWidthClass = local.fullWidth ? "w-full" : "";
  const labelClass = clsx(
    "relative",
    "flex",
    "items-center",
    local.fullWidth && "w-full"
  );
  const inputClass = clsx(
    BASE_INPUT_CLASS,
    variantClass,
    sizeClass,
    colorClass,
    fullWidthClass,
    "p-[8px]",
    local.type === "password" && "pr-[40px]",
    local.class,
    "focus:outline-none"
  );
  console.log(sizeClass, colorClass);
  return (
    <label class={labelClass}>
      <input
        placeholder={local.placeholder}
        autocomplete={local.autocomplete}
        disabled={local.disabled}
        value={local.value}
        type={inputType()}
        onFocus={local.type === "password" ? onPasswordInputFocus : undefined}
        onBlur={local.type === "password" ? onPasswordInputBlur : undefined}
        class={inputClass}
        {...inputProps}
      />
      {showPasswordVisibilityButton() && (
        <button
          tabIndex={-1}
          type="button"
          class="rounded-full bg-transparent p-2 hover:bg-[#7f805d44] hover:bg-opacity-15 absolute right-0"
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
    </label>
  );
};

export default TextField;
