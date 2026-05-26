import { z } from "zod";

/** Coerce FormData null/missing values for Zod (avoids "expected string, received null"). */
export function formEntry(value: FormDataEntryValue | null): string | undefined {
  if (value === null) return undefined;
  return String(value);
}

export const zFormString = z.preprocess(
  (v) => (v === null || v === undefined ? "" : String(v)),
  z.string()
);

export const zFormOptionalString = z.preprocess(
  (v) => {
    if (v === null || v === undefined) return undefined;
    const s = String(v).trim();
    return s === "" ? undefined : s;
  },
  z.string().optional()
);

export const zFormEmail = z.preprocess(
  (v) => (v === null || v === undefined ? "" : String(v)),
  z.string().email()
);

export const zFormUrl = z.preprocess(
  (v) => {
    if (v === null || v === undefined) return undefined;
    const s = String(v).trim();
    return s === "" ? undefined : s;
  },
  z.union([z.string().url(), z.literal("")]).optional()
);

export const zFormNumber = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? undefined : v),
  z.coerce.number()
);

export const zFormInt = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? undefined : v),
  z.coerce.number().int()
);

export const zFormBoolean = z.preprocess(
  (v) => v === true || v === "true" || v === "on",
  z.boolean()
);
