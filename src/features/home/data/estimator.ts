export type Option = { value: string; label: string; factor: number }

/** Stand-in options and factors — Figma node 14470:1956 only draws placeholders. */
export const PLAN_OPTIONS: Option[] = [
  { value: 'basic', label: 'Basic', factor: 3_490_000 },
  { value: 'premium', label: 'Premium', factor: 7_299_000 },
  { value: 'supreme', label: 'Supreme', factor: 11_890_000 },
]

export const AMENITY_OPTIONS: Option[] = [
  { value: 'co-ban', label: 'Cơ bản', factor: 1 },
  { value: 'day-du', label: 'Đầy đủ', factor: 1.15 },
  { value: 'cao-cap', label: 'Cao cấp', factor: 1.3 },
]

/** Term discounts, matching the "Chiết khấu: 3T: 0% | 6T: 5% | 12T: 7%" line. */
export const MONTH_OPTIONS: Option[] = [
  { value: '3', label: '3 tháng', factor: 3 * 1 },
  { value: '6', label: '6 tháng', factor: 6 * 0.95 },
  { value: '12', label: '12 tháng', factor: 12 * 0.93 },
]

export const LOCATION_OPTIONS: Option[] = [
  { value: 'ha-noi', label: 'Hà Nội', factor: 1 },
  { value: 'da-nang', label: 'Đà Nẵng', factor: 0.9 },
  { value: 'ho-chi-minh', label: 'Hồ Chí Minh', factor: 1.1 },
]

export function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN').format(Math.round(value))
}
