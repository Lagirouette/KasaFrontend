"use client";

import { useState, type ComponentProps } from "react";

type Props = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  error?: string;
};

export default function PasswordField({ id, label, error, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="border-line focus:border-primary aria-[invalid=true]:border-danger h-10 w-full rounded-[5px] border bg-white pr-24 pl-3 text-sm outline-none"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-pressed={visible}
          aria-controls={id}
          className="text-primary absolute inset-y-1 right-1 rounded-[4px] px-2 text-xs font-medium hover:underline"
        >
          {visible ? "Masquer" : "Afficher"} <span className="sr-only">le mot de passe</span>
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
