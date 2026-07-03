"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { submitNetlifyForm } from "@/lib/netlifyForm";

import { FormSuccess } from "./FormSuccess";
import { HoneypotField } from "./HoneypotField";
import {
  fieldControlClass,
  fieldErrorClass,
  fieldHintClass,
  fieldLabelClass,
  formCardClass,
} from "./formStyles";

const FORM_NAME = "youth-join";

type Status = "idle" | "submitting" | "success" | "error";

export function YouthJoinForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  if (status === "success") {
    return (
      <FormSuccess
        title="You’re on the list"
        message="Thanks for signing up. A coordinator will email your parent or guardian with next steps."
      />
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const { ok } = await submitNetlifyForm(FORM_NAME, event.currentTarget);
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
          <label className={fieldLabelClass} htmlFor={`${id}-student-name`}>
            Student name <span className="text-red">*</span>
          </label>
          <input
            id={`${id}-student-name`}
            className={fieldControlClass}
            type="text"
            name="studentName"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-grade-age`}>
            Grade or age <span className="text-red">*</span>
          </label>
          <p className={fieldHintClass} id={`${id}-grade-age-hint`}>
            For example, “10th grade” or “15.”
          </p>
          <input
            id={`${id}-grade-age`}
            className={fieldControlClass}
            type="text"
            name="gradeAge"
            required
            aria-required="true"
            aria-describedby={`${id}-grade-age-hint`}
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-guardian-name`}>
            Parent or guardian name <span className="text-red">*</span>
          </label>
          <input
            id={`${id}-guardian-name`}
            className={fieldControlClass}
            type="text"
            name="guardianName"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-guardian-email`}>
            Parent or guardian email <span className="text-red">*</span>
          </label>
          <p className={fieldHintClass} id={`${id}-guardian-email-hint`}>
            We’ll use this to follow up — not the student’s email.
          </p>
          <input
            id={`${id}-guardian-email`}
            className={fieldControlClass}
            type="email"
            name="guardianEmail"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={`${id}-guardian-email-hint`}
          />
        </div>

        <div>
          <label className={fieldLabelClass} htmlFor={`${id}-why-join`}>
            Why do you want to join? <span className="text-red">*</span>
          </label>
          <p className={fieldHintClass} id={`${id}-why-join-hint`}>
            A sentence or two is plenty — what interests you about Ongshi Youth?
          </p>
          <textarea
            id={`${id}-why-join`}
            className={`${fieldControlClass} min-h-[112px] resize-y`}
            name="whyJoin"
            rows={4}
            required
            aria-required="true"
            aria-describedby={`${id}-why-join-hint`}
          />
        </div>
      </div>

      {status === "error" ? (
        <p className={`${fieldErrorClass} mt-6`} role="alert">
          Something went wrong sending your sign-up. Please try again, or have a
          parent email us at{" "}
          <a
            className="font-semibold text-[#2A39C0] underline underline-offset-2"
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
          variant="blue"
          disabled={status === "submitting"}
          className="w-full justify-center sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Join Ongshi Youth"}
        </Button>
      </div>
    </form>
  );
}
