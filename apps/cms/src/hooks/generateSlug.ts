import type { FieldHook } from 'payload';

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const generateSlug: FieldHook = ({ data, operation, value }) => {
  if (operation === 'create' || !value) {
    const fallback = data?.title;
    if (fallback && typeof fallback === 'string') {
      return format(fallback);
    }
  }
  return typeof value === 'string' ? format(value) : value;
};
