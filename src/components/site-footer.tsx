import { NavLink } from "react-router-dom";

import { BrandButton } from "@/components/brand-button";
import { BrandLogo } from "@/components/brand-logo";
import { Input } from "@/components/ui/input";

const MENU_LINKS = [
  { label: "Dành Cho Sinh Viên", to: "/danh-cho-sinh-vien" },
  { label: "Dành Cho Trường", to: "/danh-cho-truong" },
  { label: "Về Chúng Tôi", to: "/ve-chung-toi" },
  { label: "Services Hub", to: "/services-hub" },
  { label: "FAQ", to: "/faq" },
];

const SOCIALS = [
  { name: "Facebook", src: "/images/home/social/facebook.svg", href: "#" },
  { name: "Instagram", src: "/images/home/social/instagram.svg", href: "#" },
  { name: "YouTube", src: "/images/home/social/youtube.svg", href: "#" },
  { name: "LinkedIn", src: "/images/home/social/linkedin.svg", href: "#" },
  { name: "TikTok", src: "/images/home/social/tiktok.svg", href: "#" },
];

/** Footer — Figma node 14470:2002 ("Clients" in Figma). */
export function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Figma columns total 1190px, so they only fit from 1280 up. */}
      <div className="container-hr grid gap-12 py-10 lg:grid-cols-2 xl:grid-cols-[422px_264px_1fr] xl:gap-x-30">
        <div className="flex flex-col gap-8">
          <BrandLogo width={200} height={92} className="h-23 w-50" />

          <div className="flex flex-col gap-3">
            <form
              className="flex flex-col gap-1.5"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="footer-email" className="type-body font-medium text-white">
                Liên hệ với chúng tôi
              </label>
              <div className="flex items-start gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Email"
                  // Without `text-neutral-900` the input inherits `text-white` from <footer>.
                  // The `dark:` pair overrides `dark:bg-input/30` from ui/input.
                  className="h-10 flex-1 rounded-[6px] border border-slate-line bg-white text-neutral-900 placeholder:text-slate-soft dark:bg-white dark:text-neutral-900"
                />
                <BrandButton type="submit" shape="rounded" className="type-body">
                  Gửi
                </BrandButton>
              </div>
            </form>

            <address className="type-p-ui text-white/50 not-italic">
              <a
                href="mailto:Hey@homerunvn.com"
                className="transition-colors hover:text-white"
              >
                Hey@homerunvn.com
              </a>
              <br />
              <a href="tel:+84912883698" className="transition-colors hover:text-white">
                Tel: +84 91288 3698
              </a>
              <br />
              Hanoi, Vietnam
            </address>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          <h2 className="type-h4 font-semibold tracking-[-0.1px] text-white/50">Menu</h2>
          {MENU_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="w-fit type-p-ui font-medium text-white transition-colors duration-200 hover:text-brand"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-4 lg:col-span-2 xl:col-span-1 xl:ml-auto xl:w-66 xl:self-end">
          <ul className="flex items-start justify-center gap-6">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={social.name}
                  className="block transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
                >
                  <img
                    src={social.src}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center type-body text-white/50">
            © 2025 Homerun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
