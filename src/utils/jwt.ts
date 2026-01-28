type JwtPayload = {
  sub?: string;
  [key: string]: unknown;
};

const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const base64Decode = (input: string): string => {
  const globalAtob = (globalThis as { atob?: (data: string) => string }).atob;
  if (typeof globalAtob === 'function') {
    return globalAtob(input);
  }

  // Fallback for environments without atob/Buffer.
  let str = input.replace(/=+$/, '');
  let output = '';
  let buffer = 0;
  let bits = 0;

  for (let i = 0; i < str.length; i += 1) {
    const idx = b64chars.indexOf(str[i]);
    if (idx === -1) continue;
    buffer = (buffer << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }

  return output;
};

const decodeUtf8 = (binary: string): string => {
  try {
    const encoded = binary
      .split('')
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('');
    return decodeURIComponent(encoded);
  } catch {
    return binary;
  }
};

export const decodeJwtPayload = (token?: string): JwtPayload | null => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');

  try {
    const decoded = decodeUtf8(base64Decode(padded));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
};
