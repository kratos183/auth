// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   ICON COMPONENTS
═══════════════════════════════════════════════════════════════ */
const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const StarIcon = () => <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ArrowRightIcon = () => <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const MailIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

/* ══════════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children, color = "teal" }: { children: React.ReactNode; color?: "teal" | "indigo" | "amber" | "rose" }) {
  const colors = {
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${colors[color]}`}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, href = "#", variant = "indigo" }: { children: React.ReactNode; href?: string; variant?: "indigo" | "teal" | "amber" | "outline" | "white" }) {
  const variants = {
    indigo: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/30",
    teal: "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg shadow-teal-500/30",
    amber: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/30",
    outline: "bg-white text-indigo-700 border-2 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50",
    white: "bg-white text-indigo-700 hover:bg-slate-50 shadow-lg",
  };
  return (
    <Link href={href} className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]}`}>
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home", "Shop", "Collections", "New Arrivals", "About", "Contact"];
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md shadow-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/30">L</div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 leading-none tracking-tight">LUXEHOME</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em]">Premium Living</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link key={l} href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100">
              Dashboard
            </Link>
            <Link href="/admin" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 rounded-full hover:from-rose-500 hover:to-amber-500 transition-all shadow-md shadow-rose-600/20">
              Admin Portal
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <Link key={l} href="#" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">{l}</Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/login" className="flex items-center justify-center gap-2 w-full py-3 text-base font-semibold text-slate-800 bg-slate-100 rounded-xl">Sign In</Link>
              <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full py-3 text-base font-semibold text-indigo-700 bg-indigo-50 rounded-xl">User Dashboard</Link>
              <Link href="/admin" className="flex items-center justify-center gap-2 w-full py-3 text-base font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 rounded-xl">Admin Portal</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION (ULTRA-MODERN & FULLY RESPONSIVE)
═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-10 left-10 sm:left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-20 right-10 sm:right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-rose-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>2026 ARCHITECTURAL LIVING COLLECTION</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Elevate Your Home with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500">
                Timeless Luxury
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated artisanal furniture engineered for modern comfort, architectural elegance, and heirloom durability.
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-amber-400 text-lg">💎</span>
                <div>
                  <p className="text-xs font-bold text-white">Solid Teak Wood</p>
                  <p className="text-[11px] text-slate-400">Master handcrafted</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-orange-400 text-lg">⚡</span>
                <div>
                  <p className="text-xs font-bold text-white">White-Glove Setup</p>
                  <p className="text-[11px] text-slate-400">Delivered & installed</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-emerald-400 text-lg">🛡️</span>
                <div>
                  <p className="text-xs font-bold text-white">10-Yr Guarantee</p>
                  <p className="text-[11px] text-slate-400">Postgres verified</p>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started / Sign In</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>View Dashboard</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-slate-950 border-2 border-slate-900">JD</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">MK</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">RS</div>
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-200 border-2 border-slate-900">+12k</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <span className="font-semibold text-slate-200">4.9/5 Rating</span>
                <span>from verified homeowners</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 group">
                <div className="aspect-[4/3] sm:aspect-[16/13] w-full relative">
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85"
                    alt="Luxury Emerald Sofa"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* Floating Trending Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <span>🔥</span>
                  <span>Trending Choice 2026</span>
                </div>

                {/* Bottom Product Info Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 flex items-center justify-between shadow-2xl">
                  <div>
                    <span className="text-[10px] font-black tracking-wider uppercase text-amber-400">
                      Living Room Series
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Emerald Velvet Signature Sofa
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Handcrafted Pine Frame • 5 Seater
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-slate-500">₹62,000</span>
                    <p className="text-base sm:text-lg font-black text-amber-400">₹45,000</p>
                  </div>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-4 z-30 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-white">In Stock & Verified</p>
                  <p className="text-[11px] text-slate-400">Ready for priority dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATS / TRUST SECTION
═══════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-700/50">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-amber-400">15k+</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Happy Customers</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-orange-400">5000+</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Products Delivered</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-rose-400">98%</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Satisfaction Rate</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-teal-400">24/7</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORIES SECTION
═══════════════════════════════════════════════════════════════ */
function Categories() {
  const categories = [
    { title: "Living Room", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", items: ["Sofas", "Coffee Tables", "TV Units"] },
    { title: "Bedroom", img: "https://images.unsplash.com/photo-1505693416388-b0346ef4143d?w=400&h=300&fit=crop", items: ["Beds", "Wardrobes", "Night Stands"] },
    { title: "Dining", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop", items: ["Dining Tables", "Chairs", "Bar Stools"] },
    { title: "Office", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop", items: ["Desks", "Office Chairs", "Storage"] },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel color="amber">Shop by Category</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Our Dedicated Categories</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Explore our curated collection of premium furniture and home decor</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
              <div className="h-48 overflow-hidden relative">
                <Image src={cat.img} alt={cat.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold flex items-center gap-1">Shop Now <ArrowRightIcon /></span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <CheckCircleIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEST SELLERS
═══════════════════════════════════════════════════════════════ */
function BestSellers() {
  const products = [
    { name: "Premium Velvet Sofa Set", price: "₹45,000", tag: "Best Seller", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop" },
    { name: "Solid Wood Dining Table", price: "₹32,000", tag: "Hot", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&h=300&fit=crop" },
    { name: "King Size Bed with Storage", price: "₹55,000", tag: "New", img: "https://images.unsplash.com/photo-1505693416388-b0346ef4143d?w=300&h=300&fit=crop" },
    { name: "Modern Office Chair", price: "₹12,500", tag: "Popular", img: "https://images.unsplash.com/photo-1505843490238-7dd340873f96?w=300&h=300&fit=crop" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel color="indigo">Top Picks</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Our Best Sellers</h2>
          </div>
          <Link href="#" className="text-indigo-600 font-semibold flex items-center hover:underline">
            View All Products <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image src={product.img} alt={product.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">{product.price}</span>
                  <button className="p-2 bg-slate-100 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MEDIA / TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Media() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gray-500 font-semibold tracking-wider uppercase text-sm">As Featured In</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">As Seen On Top Media</h2>
          <p className="mt-4 text-gray-600">Trusted by thousands of homeowners across India.</p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500 mb-20">
          {['Architectural Digest', 'Elle Decor', 'Home & Garden', 'Better Homes', 'Interior Design'].map((brand, i) => (
            <div key={i} className="flex justify-center">
              <span className="text-2xl font-black text-gray-400">{brand}</span>
            </div>
          ))}
        </div>

        {/* Testimonials Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Priya Sharma", role: "Interior Designer", text: "LuxeHome transformed my client's living room. The quality and craftsmanship are exceptional!", stars: 5 },
            { name: "Rahul Verma", role: "Homeowner", text: "Best furniture shopping experience. The delivery was smooth and the quality exceeded expectations.", stars: 5 },
            { name: "Anjali Patel", role: "Architect", text: "I recommend LuxeHome to all my clients. Premium quality at reasonable prices.", stars: 5 }
          ].map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative">
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, s) => <StarIcon key={s} />)}
              </div>
              <p className="text-gray-700 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPLORE ALL PRODUCTS
═══════════════════════════════════════════════════════════════ */
function ExploreProducts() {
  const items = [
    { name: "Sofas & Couches", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop" },
    { name: "Dining Sets", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&h=200&fit=crop" },
    { name: "Beds & Mattresses", img: "https://images.unsplash.com/photo-1505693416388-b0346ef4143d?w=200&h=200&fit=crop" },
    { name: "Storage Solutions", img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&h=200&fit=crop" },
    { name: "Lighting", img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&h=200&fit=crop" },
    { name: "Decor & Accessories", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel color="amber">Browse All</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">Explore All Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-slate-800 relative">
                <Image src={item.img} alt={item.name} width={200} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <p className="text-sm font-medium text-gray-300 group-hover:text-white text-center transition-colors">{item.name}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
            View Full Catalog <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VISION SECTION
═══════════════════════════════════════════════════════════════ */
function Vision() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <SectionLabel color="amber">Our Vision</SectionLabel>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Crafting Beautiful Living Spaces</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              At LuxeHome, we believe your home should be a reflection of your personality. We curate premium furniture and decor that combines style, comfort, and functionality to create spaces you'll love coming home to.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Quality Craftsmanship", desc: "Handpicked premium materials" },
                { title: "Sustainable Design", desc: "Eco-friendly practices" },
                { title: "Customer First", desc: "Your satisfaction guaranteed" },
                { title: "Expert Support", desc: "Design consultation available" }
              ].map((pillar, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
                  <h4 className="font-bold text-slate-900 mb-1">{pillar.title}</h4>
                  <p className="text-sm text-slate-500">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/50 to-orange-400/50 rounded-3xl rotate-3"></div>
            <Image 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Beautiful Living Space" 
              width={600} 
              height={400} 
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT / CTA SECTION
═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
            <div className="text-white">
              <SectionLabel color="amber">Get In Touch</SectionLabel>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                Need Help Choosing<br />the Perfect Furniture?
              </h2>
              <p className="mt-5 text-indigo-100 text-lg leading-relaxed">
                Our design experts are here to help you create your dream home. Get personalized recommendations and exclusive offers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="#" className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-lg">
                  Get Free Consultation <ArrowRightIcon />
                </Link>
                <Link href="tel:+919876543210" className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                  <PhoneIcon className="w-5 h-5 mr-2" /> Call Us Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-black text-slate-900 mb-1">Send Us a Message</h3>
              <p className="text-sm text-slate-500 mb-6">Fill in the details and we'll get back to you within 24 hours.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-500 focus:border-indigo-500 outline-none bg-white">
                    <option>Interested In</option>
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Dining</option>
                    <option>Office</option>
                  </select>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-500 focus:border-indigo-500 outline-none bg-white">
                    <option>Budget Range</option>
                    <option>Under ₹50k</option>
                    <option>₹50k - ₹1L</option>
                    <option>Above ₹1L</option>
                  </select>
                </div>
                <textarea rows={3} placeholder="Tell us about your requirements..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 outline-none resize-none"></textarea>
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all text-sm">
                  Send Message →
                </button>
                <p className="text-center text-[10px] text-slate-400">We respect your privacy. No spam, ever.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-300 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(99,102,241,0.15),transparent_50%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-lg">L</div>
              <div>
                <span className="text-lg font-black text-white leading-none block">LUXEHOME</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">Premium Living</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-sm">Transform your living space with our curated collection of premium furniture and home decor. Quality, style, and comfort delivered to your doorstep.</p>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Contact Us</p>
              <p className="flex items-center gap-2 text-slate-400"><PhoneIcon className="w-4 h-4" /> +91 98765 43210</p>
              <p className="flex items-center gap-2 text-slate-400"><MailIcon /> hello@luxehome.in</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Shop", "New Arrivals", "About Us", "Contact", "Track Order", "Returns"].map((l) => (
                <li key={l}><Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {["Living Room", "Bedroom", "Dining", "Office", "Storage", "Lighting", "Decor"].map((l) => (
                <li key={l}><Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Brands</h4>
            <ul className="space-y-2.5 text-sm">
              {["Luxe Collection", "Modern Living", "Classic Home", "Urban Style", "Scandinavian", "Minimalist"].map((l) => (
                <li key={l}><Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">Copyright 2024 | LuxeHome | All Rights Reserved | Privacy Policy | Terms of Service</p>
          <div className="flex gap-3">
            {["f", "in", "ig", "yt"].map((s, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-500 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white transition-all">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING WHATSAPP
═══════════════════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a href="#" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform">
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-x-hidden">
      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 4s ease-in-out infinite 1s; }
        .animate-float-slow-delayed { animation: float-slow 5s ease-in-out infinite 1.5s; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <BestSellers />
      <Media />
      <ExploreProducts />
      <Vision />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}