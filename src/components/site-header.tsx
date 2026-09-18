import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { BrandButton } from "@/components/brand-button";
import { BrandLogo } from "@/components/brand-logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Trang Chủ", to: "/" },
  { label: "Dành Cho Trường", to: "/danh-cho-truong" },
  { label: "Về Chúng Tôi", to: "/ve-chung-toi" },
  { label: "Services Hub", to: "/services-hub" },
  { label: "FAQ", to: "/faq" },
];

/** Tablet/mobile menu — Figma node 14308:15295, more entries than the desktop nav. */
const MENU_ITEMS = [
  ...NAV_ITEMS,
  { label: "Tài khoản", to: "/tai-khoan" },
  { label: "Danh sách yêu thích", to: "/yeu-thich" },
  { label: "Hợp Đồng Thuê", to: "/hop-dong-thue" },
  { label: "Bảo trì 24h", to: "/bao-tri-24h" },
  { label: "Liên hệ CSKH", to: "/lien-he" },
];

/** Header over the hero — Figma node 14615:16463. Hamburger below `lg`. */
export function SiteHeader({ overHero = true }: { overHero?: boolean }) {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  // Transparent only works over the dark hero.
  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 m-4 rounded-full",
        solid
          ? "bg-neutral-900/85 shadow-figma-lg backdrop-blur-lg"
          : "bg-none  to-transparent",
      )}
    >
      {/* `m-4` on <header> eats 16px per side, so padding is 16px under the standard container. */}
      <div className="relative mx-auto flex h-full w-full max-w-360 items-center px-1 py-2 md:px-4 xl:px-14">
        {/* Equal `flex-1 basis-0` sides centre the nav while keeping it in flow. */}
        <div className="flex flex-1 basis-0 justify-start">
          <NavLink
            to="/"
            aria-label="Homerun — về trang chủ"
            className="ml-4 shrink-0 xl:ml-6"
          >
            <BrandLogo className="transition-transform duration-200 hover:scale-105" />
          </NavLink>
        </div>

        <nav className="hidden h-14 shrink-0 items-center lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "group relative flex h-full items-center px-3 type-p-ui font-medium whitespace-nowrap transition-colors duration-200 xl:px-4 hd:px-6",
                  isActive ? "text-brand" : "text-white hover:text-white/80",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.75 origin-left bg-brand transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 basis-0 items-center justify-end gap-3 xl:mr-2">
          <span aria-hidden className="hidden h-8 w-px bg-neutral-300/60 lg:block" />

          <BrandButton variant="light" asChild>
            <NavLink to="/tro-thanh-host">Trở thành Host</NavLink>
          </BrandButton>

          <BrandButton
            variant="quiet"
            size="icon"
            asChild
            className="hidden text-white lg:inline-flex"
          >
            <NavLink to="/dang-nhap" aria-label="Đăng nhập">
              <LogIn className="size-6" />
            </NavLink>
          </BrandButton>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <BrandButton
                variant="quiet"
                size="icon"
                aria-label="Mở menu"
                className="lg:hidden"
              >
                <Menu className="size-6" />
              </BrandButton>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex flex-col gap-0 border-none bg-white p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-93"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex h-20 shrink-0 items-center justify-end gap-3 pr-5">
                <BrandButton variant="dark" asChild onClick={() => setMenuOpen(false)}>
                  <NavLink to="/tro-thanh-host">Trở thành Host</NavLink>
                </BrandButton>

                <NavLink
                  to="/dang-nhap"
                  aria-label="Đăng nhập"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-10 place-items-center rounded-full transition-colors duration-150 hover:bg-neutral-100"
                >
                  <LogIn className="size-6 text-brand" />
                </NavLink>

                <span aria-hidden className="h-8 w-px bg-neutral-300" />

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Đóng menu"
                  className="grid size-10 place-items-center rounded-full transition-colors duration-150 hover:bg-neutral-100"
                >
                  <X className="size-6 text-neutral-800" />
                </button>
              </div>

              {/* Figma puts the list at top 112, i.e. 32 below the header bar. */}
              <nav className="mt-8 flex min-h-0 flex-1 flex-col overflow-y-auto">
                {MENU_ITEMS.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "p-5 type-p-ui font-medium transition-colors duration-150",
                        index > 0 && "border-t-[0.5px] border-neutral-300",
                        isActive
                          ? "border-l-4 border-l-brand text-brand"
                          : "text-neutral-800 hover:bg-neutral-50",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                className="shrink-0 border-t-[0.5px] border-neutral-300 p-5 text-left type-p-ui font-medium text-red-600 transition-colors duration-150 hover:bg-neutral-50"
              >
                Đăng xuất
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
