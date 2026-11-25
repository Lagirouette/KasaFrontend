"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { createProperty, type PropertyFormState } from "@/app/actions/properties";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextField, { TextArea } from "@/components/ui/TextField";
import {
  CATEGORIES,
  EQUIPMENTS,
  FIELD_ORDER,
  MAX_PICTURES,
  MAX_TAGS,
  readPropertyForm,
  validateProperty,
  type PropertyFormErrors,
  type PropertyFormInput,
} from "@/lib/property-form";
import ImageUploadField from "./ImageUploadField";

const FIELD_LABELS: Record<keyof PropertyFormInput, string> = {
  title: "Titre de la propriété",
  description: "Description",
  postalCode: "Code postal",
  location: "Localisation",
  price: "Prix par nuit",
  cover: "Image de couverture",
  pictures: "Images du logement",
  hostName: "Nom de l'hôte",
  hostPicture: "Photo de profil",
  equipments: "Équipements",
  tags: "Catégories",
};

const FIELD_TARGETS: Record<keyof PropertyFormInput, string> = {
  title: "title",
  description: "description",
  postalCode: "postalCode",
  location: "location",
  price: "price",
  cover: "cover",
  pictures: "picture-0",
  hostName: "hostName",
  hostPicture: "hostPicture",
  equipments: "equipment-0",
  tags: "custom-tag",
};

type Picture = { key: number; url: string };

export default function PropertyForm({ defaultHostName = "" }: { defaultHostName?: string }) {
  const [state, formAction, pending] = useActionState<PropertyFormState, FormData>(createProperty, {});
  const [clientErrors, setClientErrors] = useState<PropertyFormErrors | null>(null);
  const [cover, setCover] = useState("");
  const [pictures, setPictures] = useState<Picture[]>([{ key: 0, url: "" }]);
  const [hostPicture, setHostPicture] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [uploads, setUploads] = useState(0);
  const nextKey = useRef(1);
  const summaryRef = useRef<HTMLDivElement>(null);

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const errorFields = FIELD_ORDER.filter((field) => errors[field]);
  const busy = pending || uploads > 0;

  const trackUpload = (uploading: boolean) => setUploads((count) => count + (uploading ? 1 : -1));

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const validation = validateProperty(readPropertyForm(formData));

    if (Object.keys(validation).length > 0) {
      setClientErrors(validation);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  function onFormChange(event: FormEvent<HTMLFormElement>) {
    if (!clientErrors) return;
    const validation = validateProperty(readPropertyForm(new FormData(event.currentTarget)));
    setClientErrors(
      Object.fromEntries(Object.entries(validation).filter(([field]) => field in clientErrors)) as PropertyFormErrors
    );
  }

  function toggleTag(tag: string) {
    setTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  }

  function addCustomTag() {
    const tag = customTag.trim().replace(/\s+/g, " ");
    if (!tag) return;
    const exists = [...CATEGORIES, ...customTags].find((t) => t.toLowerCase() === tag.toLowerCase());
    if (exists) {
      setTags((current) => (current.includes(exists) ? current : [...current, exists]));
    } else {
      setCustomTags((current) => [...current, tag.slice(0, 30)]);
      setTags((current) => [...current, tag.slice(0, 30)]);
    }
    setCustomTag("");
  }

  function onCustomTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomTag();
    }
  }

  const allTags = [...CATEGORIES, ...customTags];

  return (
    <form id="property-form" onSubmit={onSubmit} onChange={onFormChange} noValidate aria-describedby="required-note">
      <div className="mt-6 flex items-center justify-between gap-4 md:mt-10">
        <h1 className="text-lg font-medium md:text-xl">Ajouter une propriété</h1>
        <Button type="submit" size="sm" disabled={busy} className="min-w-[90px]">
          {pending ? "Ajout…" : "Ajouter"}
        </Button>
      </div>
      <p id="required-note" className="text-muted mt-2 text-xs">
        Les champs marqués d&apos;un astérisque (*) sont obligatoires.
        {uploads > 0 && " Patientez pendant l'envoi des images."}
      </p>

      {(state.error || errorFields.length > 0) && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-danger bg-danger/5 text-danger mt-4 rounded-[10px] border p-4 text-sm"
        >
          <p className="font-medium">{state.error && !clientErrors ? state.error : "Le formulaire contient des erreurs :"}</p>
          {errorFields.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorFields.map((field) => (
                <li key={field}>
                  <a href={`#${FIELD_TARGETS[field]}`} className="underline underline-offset-2">
                    {FIELD_LABELS[field]} : {errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6 grid items-start gap-4 md:grid-cols-2 md:gap-6">
        <Card as="section" aria-label="Informations principales" className="flex flex-col gap-5 md:px-10 md:py-12">
          <TextField
            id="title"
            name="title"
            label="Titre de la propriété *"
            placeholder="Ex : Appartement cosy au cœur de Paris"
            required
            maxLength={100}
            error={errors.title}
          />
          <TextArea
            id="description"
            name="description"
            label="Description *"
            placeholder="Décrivez votre propriété en détail…"
            required
            maxLength={2000}
            error={errors.description}
          />
          <TextField
            id="postalCode"
            name="postalCode"
            label="Code postal *"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="\d{5}"
            maxLength={5}
            required
            error={errors.postalCode}
          />
          <TextField
            id="location"
            name="location"
            label="Localisation *"
            placeholder="Ex : Paris 17e"
            autoComplete="address-level2"
            required
            maxLength={100}
            error={errors.location}
          />
          <TextField
            id="price"
            name="price"
            type="number"
            label="Prix par nuit (€) *"
            inputMode="numeric"
            min={1}
            max={10000}
            step={1}
            required
            error={errors.price}
          />
        </Card>

        <div className="flex flex-col gap-4 md:gap-6">
          <Card as="section" aria-label="Photos" className="flex flex-col gap-5 md:px-10 md:py-10">
            <ImageUploadField
              id="cover"
              name="cover"
              label="Image de couverture *"
              value={cover}
              onChange={setCover}
              onUploadingChange={trackUpload}
              purpose="property-cover"
              required
              error={errors.cover}
            />
            <fieldset className="flex flex-col gap-4">
              <legend className="sr-only">Images du logement</legend>
              {pictures.map((picture, index) => (
                <ImageUploadField
                  key={picture.key}
                  id={`picture-${index}`}
                  name="pictures"
                  label={pictures.length > 1 ? `Image du logement ${index + 1}` : "Image du logement"}
                  value={picture.url}
                  onChange={(url) =>
                    setPictures((current) => current.map((p) => (p.key === picture.key ? { ...p, url } : p)))
                  }
                  onUploadingChange={trackUpload}
                  purpose="property-picture"
                  error={index === 0 ? errors.pictures : undefined}
                  onRemove={
                    pictures.length > 1
                      ? () => setPictures((current) => current.filter((p) => p.key !== picture.key))
                      : undefined
                  }
                />
              ))}
            </fieldset>
            {pictures.length < MAX_PICTURES ? (
              <button
                type="button"
                onClick={() => setPictures((current) => [...current, { key: nextKey.current++, url: "" }])}
                className="text-primary self-start text-sm hover:underline"
              >
                + Ajouter une image
              </button>
            ) : (
              <p className="text-muted text-xs">Vous avez atteint la limite de {MAX_PICTURES} images.</p>
            )}
          </Card>

          <Card as="section" aria-label="Hôte" className="flex flex-col gap-5 md:px-10 md:py-10">
            <TextField
              id="hostName"
              name="hostName"
              label="Nom de l'hôte *"
              autoComplete="name"
              required
              maxLength={60}
              defaultValue={defaultHostName}
              error={errors.hostName}
            />
            <ImageUploadField
              id="hostPicture"
              name="hostPicture"
              label="Photo de profil"
              value={hostPicture}
              onChange={setHostPicture}
              onUploadingChange={trackUpload}
              purpose="user-picture"
              error={errors.hostPicture}
            />
          </Card>
        </div>

        <Card as="section" className="md:px-10 md:py-12">
          <fieldset aria-describedby={errors.equipments ? "equipments-error" : undefined}>
            <legend className="text-sm font-medium">Équipements *</legend>
            <p className="text-muted mt-1 text-xs">Cochez tout ce qui est disponible dans le logement.</p>
            {errors.equipments && (
              <p id="equipments-error" className="text-danger mt-2 text-xs">
                {errors.equipments}
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {EQUIPMENTS.map((equipment, index) => (
                <label key={equipment} className="flex items-center gap-2 text-xs">
                  <input
                    id={`equipment-${index}`}
                    type="checkbox"
                    name="equipments"
                    value={equipment}
                    className="accent-primary size-4 shrink-0"
                  />
                  {equipment}
                </label>
              ))}
            </div>
          </fieldset>
        </Card>

        <Card as="section" className="md:px-10 md:py-12">
          <fieldset aria-describedby={errors.tags ? "tags-error" : "tags-hint"}>
            <legend className="text-sm font-medium">Catégories</legend>
            <p id="tags-hint" className="text-muted mt-1 text-xs">
              Sélectionnez jusqu&apos;à {MAX_TAGS} catégories.
            </p>
            {errors.tags && (
              <p id="tags-error" className="text-danger mt-2 text-xs">
                {errors.tags}
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const selected = tags.includes(tag);
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => toggleTag(tag)}
                      aria-pressed={selected}
                      className={`h-7 rounded-[5px] px-3 text-xs transition ${
                        selected ? "bg-primary text-white" : "bg-chip hover:bg-line"
                      }`}
                    >
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>
            {tags.map((tag) => (
              <input key={tag} type="hidden" name="tags" value={tag} />
            ))}
          </fieldset>

          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="custom-tag" className="text-sm font-medium">
              Ajouter une catégorie personnalisée
            </label>
            <div className="flex gap-2">
              <input
                id="custom-tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={onCustomTagKeyDown}
                placeholder="Nouveau tag"
                maxLength={30}
                className="border-field focus:border-primary placeholder:text-muted h-10 min-w-0 flex-1 rounded-[5px] border bg-white px-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={addCustomTag}
                disabled={!customTag.trim() || tags.length >= MAX_TAGS}
                aria-label="Ajouter cette catégorie"
                className="bg-primary hover:bg-primary-dark flex size-10 shrink-0 items-center justify-center rounded-[5px] text-xl text-white transition disabled:opacity-60"
              >
                <span aria-hidden>+</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}
