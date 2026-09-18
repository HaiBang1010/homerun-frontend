import { Award, ClockPlus, House, ShieldCheck, TrendingUp, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

/** Six reasons to choose Homerun — Figma node 14470:1703. */
export const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: 'Không Còn Danh Sách Lừa Đảo',
    description:
      'Mỗi bất động sản đều được xác minh. Tạm biệt ảnh giả và xem nhà lãng phí công sức.',
  },
  {
    icon: ClockPlus,
    title: 'Tiết kiệm hơn 20 giờ tìm kiếm',
    description: 'Đừng loay hoay giữa các trang. Bộ lọc tìm kiếm đối tác phù hợp trong vài phút.',
  },
  {
    icon: House,
    title: 'Tất cả trong một nơi',
    description:
      'Tìm các căn hộ. So sánh các khu phố, giá cả và tiện nghi trên 1 nền tảng duy nhất.',
  },
  {
    icon: TrendingUp,
    title: 'Biết Chi Phí Thực Sự Ngay Từ Đầu',
    description:
      'Không có phí ẩn. Chúng tôi hiển thị chi phí hàng tháng thực tế trước khi lên lịch xem.',
  },
  {
    icon: UsersRound,
    title: 'Ai đó luôn ủng hộ bạn',
    description: 'Chủ nhà có thể khó khăn. Chúng tôi là chuyên gia xử lý đàm phán và vấn đề.',
  },
  {
    icon: Award,
    title: 'Di Chuyển Với Sự Tự Tin',
    description:
      'Hơn 50.000 người thuê tin tưởng. Họ chuyển nhanh hơn, tiết kiệm và tránh căng thẳng.',
  },
]
