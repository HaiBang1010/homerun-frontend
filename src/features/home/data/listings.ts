export type Tier = 'basic' | 'premium' | 'supreme'

export type Listing = {
  id: number
  name: string
  location: string
  price: string
  area: number
  tier: Tier
  image: string
}

/** Badge colour per tier — Figma: green/600, sky/600, violet/600. */
export const TIER_STYLE: Record<Tier, { label: string; badge: string; text: string }> = {
  basic: { label: 'Basic', badge: 'bg-tier-basic', text: 'text-tier-basic' },
  premium: { label: 'Premium', badge: 'bg-tier-premium', text: 'text-tier-premium' },
  supreme: { label: 'Supreme', badge: 'bg-tier-supreme', text: 'text-tier-supreme' },
}

const IMAGES = [
  '/images/home/listings/p1.jpg',
  '/images/home/listings/p2.jpg',
  '/images/home/listings/p3.jpg',
  '/images/home/listings/p4.jpg',
]

type Seed = [name: string, location: string, price: string, area: number, tier: Tier]

/** First four entries are from Figma (node 14470:1744); the rest is stand-in data. */
const SEEDS: Seed[] = [
  ['The Win City', 'Đức Hòa, Long An', '24 triệu /tháng', 38, 'basic'],
  ['An Bình Homeland', 'Hà Đông, Hà Nội', '30 triệu /tháng', 42, 'premium'],
  ['Capital Square', 'Sơn Trà, Đà Nẵng', '35 triệu /tháng', 50, 'premium'],
  ['Sadora Apartment', 'Quận 2, Hồ Chí Minh', '45 triệu /tháng', 60, 'supreme'],

  ['Vinhomes Smart City', 'Nam Từ Liêm, Hà Nội', '18 triệu /tháng', 35, 'basic'],
  ['The Sun Avenue', 'Quận 2, Hồ Chí Minh', '28 triệu /tháng', 45, 'premium'],
  ['Mường Thanh Luxury', 'Ngũ Hành Sơn, Đà Nẵng', '32 triệu /tháng', 48, 'premium'],
  ['Empire City', 'Thủ Thiêm, Hồ Chí Minh', '52 triệu /tháng', 72, 'supreme'],

  ['Ecopark Grand', 'Văn Giang, Hưng Yên', '20 triệu /tháng', 40, 'basic'],
  ['Masteri Thảo Điền', 'Quận 2, Hồ Chí Minh', '34 triệu /tháng', 52, 'premium'],
  ['Hòa Bình Green City', 'Hai Bà Trưng, Hà Nội', '26 triệu /tháng', 44, 'premium'],
  ['Diamond Island', 'Quận 2, Hồ Chí Minh', '58 triệu /tháng', 80, 'supreme'],

  ['Rice City Linh Đàm', 'Hoàng Mai, Hà Nội', '16 triệu /tháng', 32, 'basic'],
  ['Gateway Thảo Điền', 'Quận 2, Hồ Chí Minh', '38 triệu /tháng', 56, 'premium'],
  ['FPT Plaza', 'Ngũ Hành Sơn, Đà Nẵng', '22 triệu /tháng', 41, 'premium'],
  ['Sunshine Diamond', 'Quận 7, Hồ Chí Minh', '49 triệu /tháng', 68, 'supreme'],
]

export const LISTINGS: Listing[] = SEEDS.map(([name, location, price, area, tier], index) => ({
  id: index,
  name,
  location,
  price,
  area,
  tier,
  image: IMAGES[index % IMAGES.length],
}))

