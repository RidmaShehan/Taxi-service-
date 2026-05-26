"use client";

import Image from "next/image";
import { isBase64DataUrl, imageSrc } from "@/lib/images";

type Props = {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  /** object-fit when using fill (default cover) */
  fit?: "cover" | "contain";
};

/**
 * Renders http(s) with next/image; base64 data URLs with img.
 * Always constrains to parent — use inside a relative + overflow-hidden container for `fill`.
 */
export function DbImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  fit = "cover",
}: Props) {
  const resolved = imageSrc(src);
  if (!resolved) return null;

  const objectClass = fit === "contain" ? "object-contain" : "object-cover";

  if (isBase64DataUrl(resolved)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${objectClass} ${className}`}
          decoding="async"
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        width={width}
        height={height}
        className={`max-h-full max-w-full h-auto w-full ${objectClass} ${className}`}
        decoding="async"
      />
    );
  }

  if (fill) {
    return <Image src={resolved} alt={alt} fill className={`${objectClass} ${className}`} sizes="(max-width: 768px) 100vw, 33vw" />;
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width ?? 400}
      height={height ?? 250}
      className={`${objectClass} ${className}`}
      sizes="(max-width: 768px) 100vw, 400px"
    />
  );
}

/** Standard card / hero image area — prevents overflow from large or portrait uploads. */
export function ImageFrame({
  children,
  className = "h-56",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>{children}</div>;
}
