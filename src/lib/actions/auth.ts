"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations";

export async function signIn(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  const supabase = await createClient();

  let signInError: { message: string } | null = null;
  try {
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    signInError = error;
  } catch (err) {
    const cause = err instanceof Error ? err.cause : null;
    const code =
      cause && typeof cause === "object" && "code" in cause
        ? String((cause as { code?: string }).code)
        : "";
    if (code === "ENOTFOUND" || (err instanceof Error && err.message.includes("fetch failed"))) {
      return {
        error:
          "Cannot reach Supabase. Check your internet connection, VPN, and NEXT_PUBLIC_SUPABASE_URL in .env.local, then restart the dev server (npm run dev).",
      };
    }
    throw err;
  }

  if (signInError) {
    return { error: signInError.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Login failed." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single<{ role: "user" | "admin" }>();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "You do not have admin access." };
  }

  const redirectTo = (formData.get("redirect") as string) || "/admin";
  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
