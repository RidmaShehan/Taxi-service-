export type ParsedUserAgent = {
  device_type: string;
  device_os: string;
  browser: string;
};

export function parseUserAgent(ua: string | null): ParsedUserAgent {
  if (!ua) {
    return { device_type: "unknown", device_os: "unknown", browser: "unknown" };
  }

  const lower = ua.toLowerCase();
  let device_type = "desktop";
  if (/mobile|android.*mobile|iphone|ipod|blackberry|iemobile/i.test(ua)) {
    device_type = "mobile";
  } else if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) {
    device_type = "tablet";
  }

  let device_os = "Other";
  if (/windows nt/i.test(ua)) device_os = "Windows";
  else if (/mac os x|macintosh/i.test(ua) && !/iphone|ipad/i.test(ua)) device_os = "macOS";
  else if (/iphone|ipad|ipod/i.test(ua)) device_os = "iOS";
  else if (/android/i.test(ua)) device_os = "Android";
  else if (/linux/i.test(ua)) device_os = "Linux";

  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) browser = "Chrome";
  else if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) browser = "Safari";
  else if (/firefox\//i.test(ua)) browser = "Firefox";
  else if (/opera|opr\//i.test(ua)) browser = "Opera";

  if (lower.includes("samsung")) device_os = "Samsung";
  if (lower.includes("huawei")) device_os = "Huawei";

  return { device_type, device_os, browser };
}
