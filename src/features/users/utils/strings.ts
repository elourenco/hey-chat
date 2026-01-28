export const getInitials = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return '?';
  }

  const parts = trimmed.split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? '';
  return `${first}${second}`.toUpperCase();
};
