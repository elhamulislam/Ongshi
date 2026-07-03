/** Submit a form to Netlify Forms (Next.js-compatible AJAX post). */
export async function submitNetlifyForm(
  formName: string,
  form: HTMLFormElement,
): Promise<{ ok: boolean }> {
  const formData = new FormData(form);
  formData.set("form-name", formName);

  const body = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    body.append(key, String(value));
  }

  try {
    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
