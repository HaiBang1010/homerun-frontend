/** Strips Vietnamese diacritics: "đa" must match "đại học", but is not a substring of it. */
export function normalizeVi(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
}
