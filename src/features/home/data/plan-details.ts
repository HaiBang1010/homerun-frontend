/** One bullet; `strong` is the bold brand-coloured run between `text` and `tail`. */
export type PlanBullet = {
  text: string
  strong?: string
  tail?: string
  children?: string[]
}

export type PlanSection = {
  title: string
  bullets: PlanBullet[]
}

export type PlanDetail = {
  /** The modal price range differs from the card price — taken verbatim from Figma. */
  priceRange: string
  description: string
  sections: PlanSection[]
}

const SPACE_TITLE = '🏡 Không gian & nội thất'
const CREDIT_TITLE = '⚙️ Tiện ích & Credit'
const COMMUNITY_TITLE = '🌈 Cộng đồng & sự kiện'
const NO_INCLUDE = 'Không bao gồm điện, nước, internet, vệ sinh'

/** "Chi tiết gói" modal content — Figma 14470:2497 / 14470:2936 / 14470:3375. */
export const PLAN_DETAILS: Record<string, PlanDetail> = {
  basic: {
    priceRange: '5,5 → 6,2tr',
    description:
      'Dành cho sinh viên hoặc người đi làm trẻ muốn có chỗ ở riêng tư, nội thất đầy đủ, giá hợp lý và linh hoạt trong việc sử dụng tiện ích.',
    sections: [
      {
        title: SPACE_TITLE,
        bullets: [
          { text: '01 giường queen nhỏ' },
          { text: '01 bàn học' },
          { text: '01 tủ quần áo nhỏ' },
          { text: 'Máy lạnh, tủ lạnh, máy giặt tiêu chuẩn Homerun' },
        ],
      },
      {
        title: CREDIT_TITLE,
        bullets: [
          { text: NO_INCLUDE },
          {
            text: 'Dùng ',
            strong: 'Credit 100.000 VNĐ/tháng',
            tail: ' để thanh toán:',
            children: [
              '🌐 Internet tốc độ cao (70.000 VNĐ/tháng)',
              '🧹 Dọn vệ sinh khu vực chung (80.000 VNĐ/lần)',
              '🏢 Phí dịch vụ tòa nhà',
            ],
          },
        ],
      },
      {
        title: COMMUNITY_TITLE,
        bullets: [
          { text: 'BBQ Night hàng tháng' },
          { text: 'Lớp học tài chính cá nhân' },
          { text: 'Networking dành cho sinh viên' },
        ],
      },
    ],
  },

  premium: {
    priceRange: '8,5 → 9,5tr',
    description:
      'Dành cho sinh viên hoặc nhân viên cần không gian rộng, view đẹp, nội thất hiện đại và linh hoạt sử dụng Credit.',
    sections: [
      {
        title: SPACE_TITLE,
        bullets: [
          { text: '01 giường queen tiêu chuẩn' },
          { text: '01 bàn làm việc' },
          { text: '01 tủ quần áo trung bình' },
          { text: 'Cửa sổ lớn view thành phố hoặc hồ' },
          { text: 'Máy lạnh, máy giặt, tủ lạnh theo tiêu chuẩn bàn giao Homerun' },
        ],
      },
      {
        title: CREDIT_TITLE,
        bullets: [
          { text: NO_INCLUDE },
          {
            text: 'Dùng ',
            strong: 'Credit 150.000 VNĐ/tháng',
            tail: ' để thanh toán:',
            children: [
              '🌐 Internet tốc độ cao',
              '🧹 Dọn vệ sinh khu vực chung hoặc phòng riêng',
              '🏢 Phí dịch vụ quản lý tòa nhà',
            ],
          },
        ],
      },
      {
        title: COMMUNITY_TITLE,
        bullets: [
          { text: 'BBQ Night hàng tháng' },
          { text: 'Workshop “Personal Finance 101”' },
          { text: 'Networking Night với mentor & doanh nghiệp' },
        ],
      },
    ],
  },

  supreme: {
    priceRange: '9,8 → 10,8tr',
    description:
      'Mang đến cho bạn trải nghiệm sống cao cấp với không gian rộng, đầy đủ tiện nghi, dịch vụ hỗ trợ 24/7 và quyền ưu tiên trong cộng đồng Homerun.',
    sections: [
      {
        title: SPACE_TITLE,
        bullets: [
          { text: '01 giường queen' },
          { text: '01 bàn làm việc' },
          { text: '01 sofa nhỏ' },
          { text: '01 bàn trang điểm' },
          { text: '01 tủ quần áo trung bình' },
          { text: 'View thành phố hoặc sân vườn' },
          { text: 'Máy giặt, tủ lạnh, điều hòa đạt tiêu chuẩn bàn giao' },
        ],
      },
      {
        title: CREDIT_TITLE,
        bullets: [
          { text: NO_INCLUDE },
          {
            text: 'Dùng ',
            strong: 'Credit 200.000 VNĐ/tháng',
            tail: ' để thanh toán:',
            children: [
              '🌐 Internet tốc độ cao',
              '🧹 Dọn phòng định kỳ hoặc dịch vụ nâng cao',
              '🏢 Phí dịch vụ quản lý tòa nhà',
              '💧 Chi phí điện/nước nếu có',
            ],
          },
        ],
      },
      {
        title: COMMUNITY_TITLE,
        bullets: [
          { text: 'BBQ Night, Workshop tài chính & sự nghiệp' },
          { text: 'Local Lens Tour (khám phá khu phố)' },
          { text: 'Homeliving Experience Day, Mentor Series, Brand Collab Event' },
        ],
      },
    ],
  },
}
