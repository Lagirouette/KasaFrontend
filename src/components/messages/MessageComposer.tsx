export default function MessageComposer() {
  return (
    <form className="border-line bg-surface border-t p-4 md:p-5" aria-describedby="composer-note">
      <div className="border-line flex flex-col gap-2 rounded-[10px] border p-3">
        <label htmlFor="message" className="sr-only">
          Votre message
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          disabled
          placeholder="Envoyer un message"
          className="placeholder:text-muted resize-none bg-transparent text-sm outline-none disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled
          aria-label="Envoyer le message"
          className="bg-primary flex size-7 items-center justify-center self-end rounded-[5px] text-sm text-white disabled:opacity-60"
        >
          <span aria-hidden>↑</span>
        </button>
      </div>
      <p id="composer-note" className="text-muted mt-2 text-xs">
        L&apos;envoi de messages sera bientôt disponible.
      </p>
    </form>
  );
}
