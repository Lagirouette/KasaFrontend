"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IMAGE_RULES, IMAGE_TYPES, validateImageFile } from "@/lib/property-form";

type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  purpose: "property-cover" | "property-picture" | "user-picture";
  error?: string;
  required?: boolean;
  onRemove?: () => void;
};

export default function ImageUploadField({
  id,
  label,
  name,
  value,
  onChange,
  onUploadingChange,
  purpose,
  error,
  required,
  onRemove,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const [invalidFile, setInvalidFile] = useState(false);
  const message = invalidFile ? undefined : (uploadError ?? error);
  const hasPreview = /^https?:\/\//.test(value);

  async function upload(file: File) {
    if (validateImageFile(file)) {
      setUploadError(undefined);
      setInvalidFile(true);
      return;
    }

    setInvalidFile(false);
    setUploadError(undefined);
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("purpose", purpose);
      const response = await fetch("/api/uploads", { method: "POST", body });
      const json = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !json?.url) throw new Error(json?.error ?? "L'envoi de l'image a échoué. Réessayez.");
      onChange(json.url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "L'envoi de l'image a échoué. Réessayez.");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name={name}
          type="url"
          inputMode="url"
          required={required}
          value={value}
          onChange={(e) => {
            setUploadError(undefined);
            setInvalidFile(false);
            onChange(e.target.value);
          }}
          aria-invalid={invalidFile || !!message}
          aria-describedby={`${id}-hint${message ? ` ${id}-error` : ""}`}
          className="border-field focus:border-primary aria-[invalid=true]:border-danger h-10 min-w-0 flex-1 rounded-[5px] border bg-white px-3 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          aria-label={`Choisir une image sur votre appareil pour : ${label}`}
          className="bg-primary hover:bg-primary-dark flex size-10 shrink-0 items-center justify-center rounded-[5px] text-xl text-white transition disabled:opacity-60"
        >
          <span aria-hidden>{uploading ? "…" : "+"}</span>
        </button>
        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_TYPES.join(",")}
          tabIndex={-1}
          aria-hidden
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </div>
      <p id={`${id}-hint`} role={invalidFile ? "alert" : undefined} className={invalidFile ? "text-danger text-xs" : "sr-only"}>
        {IMAGE_RULES}
      </p>
      <p aria-live="polite" className="sr-only">
        {uploading ? "Envoi de l'image en cours…" : ""}
      </p>
      {message && (
        <p id={`${id}-error`} className="text-danger text-xs">
          {message}
        </p>
      )}
      {(hasPreview || onRemove) && (
        <div className="flex items-center gap-3">
          {hasPreview && (
            <div className="bg-line relative h-16 w-24 overflow-hidden rounded-[5px]">
              <Image src={value} alt={`Aperçu : ${label}`} fill unoptimized sizes="96px" className="object-cover" />
            </div>
          )}
          {(hasPreview || onRemove) && (
            <button
              type="button"
              onClick={() => (onRemove ? onRemove() : onChange(""))}
              className="text-primary text-xs hover:underline"
            >
              Retirer l&apos;image <span className="sr-only">: {label}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
