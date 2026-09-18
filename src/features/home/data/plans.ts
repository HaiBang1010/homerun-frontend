export type Plan = {
  id: string
  name: string
  nameColor: string
  price: string
  description: string
  featured?: boolean
}

/** The three rental plans — Figma node 14470:1910. */
export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    nameColor: 'text-tier-basic',
    price: '3,490,000++',
    description:
      'Dành cho sinh viên hoặc người trẻ đi làm có nhu cầu ở ghép căn hộ với phòng ngủ cơ bản riêng tư, nội thất cơ bản, giá hợp lý và linh hoat trong việc sử dụng tiện ích.',
  },
  {
    id: 'premium',
    name: 'Premium',
    nameColor: 'text-tier-premium',
    price: '7,299,000++',
    description:
      'Dành cho sinh viên hoặc nhân viên cần không gian rộng, view đẹp, nội thất hiện đại và linh hoạt sử dụng Credit.',
    featured: true,
  },
  {
    id: 'supreme',
    name: 'Supreme',
    nameColor: 'text-tier-supreme',
    price: '11,890,000++',
    description:
      'Mang đến cho bạn trải nghiệm sống cao cấp với không gian rộng, đầy đủ tiện nghi, dịch vụ hỗ trợ 24/7 và quyền ưu tiên trong cộng đồng Homerun.',
  },
]

export const PLAN_DISCOUNT = 'Chiết khấu: 3T: 0% | 6T: 5% | 12T: 7%'

/** The three notes under the pricing table — Figma node 14470:1909. */
export const PLAN_NOTES = [
  'ℹ️ Giá thuê có thể dao động theo vị trí, diện tích và tòa nhà.',
  '💡 Chi phí điện, nước, internet, vệ sinh được thanh toán bằng Credit hoặc thêm ngoài gói.',
  '💳 Credit có thể dùng, tích lũy hoặc trừ vào kỳ thanh toán tiếp theo qua tài khoản Homerun.',
]
