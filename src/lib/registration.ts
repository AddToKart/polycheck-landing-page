"use client";

import { useEffect, useState } from "react";
import { API_URL } from "./config";

/** Temporary sign-up for data gathering. Mirrors `/registrations/public` on the API. */
export interface SignUpStatus {
  open: boolean;
  programs: Array<{ code: string; name: string }>;
}

export interface SignUpInput {
  role: "student" | "teacher";
  fullName: string;
  email: string;
  password: string;
  studentId?: string;
  program?: string;
  yearLevel?: number;
  consent: boolean;
  website?: string;
}

const UNREACHABLE = "Sign-up can't be reached right now. Check your connection and try again.";

export async function fetchSignUpStatus(): Promise<SignUpStatus> {
  const response = await fetch(`${API_URL}/registrations/public/status`, {
    credentials: "omit",
    cache: "no-store",
  });
  if (!response.ok) throw new Error(UNREACHABLE);
  return (await response.json()) as SignUpStatus;
}

export async function sendSignUp(input: SignUpInput): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/registrations/public`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error(UNREACHABLE);
  }
  if (response.ok) return;
  const body = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
  const message = Array.isArray(body?.message) ? body.message.join(". ") : body?.message;
  throw new Error(message || "Your request could not be sent. Please try again.");
}

/** True only while the institution has sign-up open, so the buttons can hide themselves. */
export function useSignUpOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let active = true;
    fetchSignUpStatus()
      .then((status) => {
        if (active) setOpen(status.open);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);
  return open;
}
