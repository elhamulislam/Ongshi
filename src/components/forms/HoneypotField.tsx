/** Visually hidden honeypot — bots fill it; Netlify rejects those submissions. */
export function HoneypotField() {
  return (
    <p className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Don’t fill this out if you’re human:{" "}
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  );
}
