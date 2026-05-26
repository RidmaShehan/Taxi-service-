export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export function validateImageFile(file: File): string | null {
  if (file.size === 0) return "No file provided";
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "Image must be 2MB or smaller";
  }
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    return "Only JPEG, PNG, WebP, or GIF images are allowed";
  }
  return null;
}

export async function fileToBase64DataUrl(
  file: File
): Promise<{ dataUrl: string } | { error: string }> {
  const validationError = validateImageFile(file);
  if (validationError) return { error: validationError };

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  return { dataUrl };
}

/** Use as img/Image src — supports http(s) URLs and base64 data URLs. */
export function imageSrc(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  const trimmed = String(value).trim();
  if (!trimmed) return undefined;
  return trimmed;
}

export function isBase64DataUrl(value: string): boolean {
  return value.startsWith("data:image/");
}
