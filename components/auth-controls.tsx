"use client";

import { signIn, signOut } from "next-auth/react";

type SignInButtonProps = {
  disabled?: boolean;
};

type SignOutButtonProps = {
  name?: string | null;
};

export function SignInButton({ disabled = false }: SignInButtonProps) {
  return (
    <button
      className="button button-primary auth-button"
      type="button"
      onClick={() => signIn("google")}
      disabled={disabled}
    >
      Continue with Google
    </button>
  );
}

export function SignOutButton({ name }: SignOutButtonProps) {
  return (
    <button
      className="button button-secondary auth-button"
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out{name ? ` ${name}` : ""}
    </button>
  );
}
