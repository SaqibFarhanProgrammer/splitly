// components/HeroSection.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Subtle Background - No Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6 sm:mb-8">
            <span className="text-zinc-400 text-xs sm:text-sm font-medium">
              Trusted by 10,000+ groups worldwide
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500" />
          </div>

          {/* Title - Industry Standard Sizes */}
          <h1 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['inter] text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
            Split expenses fairly with your group in seconds.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6 sm:mb-8">
            Our smart platform automatically tracks shared expenses, calculates
            fair shares, and shows exactly who owes whom. No more awkward
            conversations or manual calculations.
          </p>

          {/* Buttons - Industry Standard Sizes */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link href="/profile" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center sm:justify-start gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-zinc-200 transition-all duration-200">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm sm:text-base text-white border border-white/20 hover:bg-white/5 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard Preview - Responsive */}
        <div className="mt-12 sm:mt-16 lg:mt-20 relative  mx-auto">
          {/* Browser Chrome */}
          <div className="bg-zinc-900/80 backdrop-blur rounded-t-xl border border-zinc-800 p-2 sm:p-3 flex items-center gap-2 sm:gap-4">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] border border-[#1aab29]/50" />
            </div>

            {/* URL Bar */}
          </div>

          {/* Dashboard Content */}
          <div className="bg-[#0a0a0a] rounded-b-xl border border-t-0 border-zinc-800 overflow-hidden">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/ui/admin-dashboard/admin-full-1.png"
              alt="Dashboard Preview"
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Bottom Fade */}
          <div className="absolute -bottom-1 left-0 right-0 h-12 sm:h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
