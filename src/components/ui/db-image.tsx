"use client";

import Image from "next/image";
import { isBase64DataUrl } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

/** Renders http(s) URLs with next/image; base64 data URLs with unoptimized img. */
export function DbImage({ src, alt, fill, width, height, className }: Props) {
  if (isBase64DataUrl(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} width={width} height={height} className={className} />
    );
  }

  if (fill) {
    return <Image src={src} alt={alt} fill className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 250}
      className={className}
    />
  );
}
