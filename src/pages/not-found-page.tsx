import { Link } from 'react-router-dom'

import { BrandButton } from '@/components/brand-button'

export function NotFoundPage() {
  return (
    <section className="container-hr flex min-h-[60svh] flex-col items-center justify-center gap-3 py-24 text-center">
      <p className="text-[96px] leading-none font-extrabold tracking-[-2.4px] text-brand">404</p>
      <h1 className="type-h2 font-semibold text-neutral-800">Không tìm thấy trang bạn cần</h1>
      <p className="type-p-ui text-neutral-500">
        Trang có thể đã đổi địa chỉ, hoặc chưa được xây dựng.
      </p>
      <BrandButton asChild size="lg" className="mt-3">
        <Link to="/">Về trang chủ</Link>
      </BrandButton>
    </section>
  )
}
