"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { submitNetlifyForm } from "@/lib/netlifyForm";

import { FormSuccess } from "./FormSuccess";
import { HoneypotField } from "./HoneypotField";
import {
  checkboxInputClass,
  checkboxLabelClass,
  fieldControlClass,
  fieldErrorClass,
  fieldHintClass,
  fieldLabelClass,
  formCardClass,
} from "./formStyles";

const FORM_NAME = "volunteer";

const HELP_OPTIONS = [
  { value: "Events and camps", label: "Events and camps" },
  { value: "Fundraising", label: "Fundraising" },
  { value: "Outreach and admin", label: "Outreach and admin" },
  { value: "Photography and media", label: "Photography and media" },
  { value: "Youth programs", label: "Youth programs" },
  { value: "Other", label: "Other" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: "Weekdays", label: "Weekdays" },
  { value: "Weekends", label: "Weekends" },
  { value: "Evenings", label: "Evenings" },
  { value: "Flexible", label: "Flexible / as needed" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function VolunteerForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [helpError, setHelpError] = useState<string | null>(null);

  if (status === "success") {
    return (
      <FormSuccess
        title="Thanks for signing up"
        message="A coordinator will follow up soon. We’re glad you’re part of it."
      />
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedHelp = form.querySelectorAll<HTMLInputElement>(
      'input[name="help"]:checked',
    );

    if (selectedHelp.length === 0) {
      setHelpError("Please choose at least one way you’d like to help.");
      return;
    }

    setHelpError(null);
    setStatus("submitting");

    const { ok } = await submitNetlifyForm(FORM_NAME, form);
    setStatus(ok ? "success" : "error");
  }

  return (
    <form
      className={`relative ${formCardClass}`}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <HoneypotField />

      <div className="grid gap-6">
        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-name`}>
            Name <span className="text-red">*</span>
          </label>
          <input
            id={`${id}-name`}
            className={fieldControlClass}
            type="text"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-email`}>
            Email <span className="text-red">*</span>
          </label>
          <input
            id={`${id}-email`}
            className={fieldControlClass}
            type="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-phone`}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            className={fieldControlClass}
            type="tel"
            name="phone"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-city`}>
            City <span className="text-red">*</span>
          </label>
          <input
            id={`${id}-city`}
            className={fieldControlClass}
            type="text"
            name="city"
            autoComplete="address-level2"
            required
            aria-required="true"
          />
        </div>

        <fieldset>
          <legend className={fieldLabelClass}>
            How would you like to help? <span className="text-red">*</span>
          </legend>
          <p className={fieldHintClass} id={`${id}-help-hint`}>
            Choose all that apply.
          </p>
          <div
            className="mt-3 grid gap-1 sm:grid-cols-2"
            role="group"
            aria-describedby={`${id}-help-hint${helpError ? ` ${id}-help-error` : ""}`}
          >
            {HELP_OPTIONS.map((option) => (
              <label key={option.value} className={checkboxLabelClass}>
                <input
                  className={checkboxInputClass}
                  type="checkbox"
                  name="help"
                  value={option.value}
                  onChange={() => setHelpError(null)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {helpError ? (
            <p id={`${id}-help-error`} className={fieldErrorClass} role="alert">
              {helpError}
            </p>
          ) : null}
        </fieldset>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-skills`}>
            Skills <span className="font-normal text-muted">(optional)</span>
          </label>
          <p className={fieldHintClass} id={`${id}-skills-hint`}>
            Anything you’d like us to know — languages, medical training, design,
            logistics, and so on.
          </p>
          <textarea
            id={`${id}-skills`}
            className={`${fieldControlClass} min-h-[96px] resize-y`}
            name="skills"
            rows={3}
            aria-describedby={`${id}-skills-hint`}
          />
        </div>

        <fieldset>
          <legend className={fieldLabelClass}>Availability</legend>
          <p className={fieldHintClass} id={`${id}-availability-hint`}>
            Choose all that apply.
          </p>
          <div
            className="mt-3 grid gap-1 sm:grid-cols-2"
            role="group"
            aria-describedby={`${id}-availability-hint`}
          >
            {AVAILABILITY_OPTIONS.map((option) => (
              <label key={option.value} className={checkboxLabelClass}>
                <input
                  className={checkboxInputClass}
                  type="checkbox"
                  name="availability"
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-message`}>
            Anything else?{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            className={`${fieldControlClass} min-h-[112px] resize-y`}
            name="message"
            rows={4}
          />
        </div>
      </div>

      {status === "error" ? (
        <p className={`${fieldErrorClass} mt-6`} role="alert">
          Something went wrong sending your sign-up. Please try again, or email
          us at{" "}
          <a
            className="font-semibold text-green-deep underline underline-offset-2"
            href="mailto:info@ongshi.org"
          >
            info@ongshi.org
          </a>
          .
        </p>
      ) : null}

      <div className="mt-8">
        <Button
          type="submit"
          variant="ghost"
          disabled={status === "submitting"}
          className="w-full justify-center sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Sign up to volunteer"}
        </Button>
      </div>
    </form>
  );
}
