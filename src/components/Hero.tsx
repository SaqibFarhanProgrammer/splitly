// components/HeroSection.tsx
import { ArrowRight } from "lucide-react";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative h-[190vh] bg-black overflow-hidden">
      {/* Gradient Glow Effect */}
      <div className="absolute bottom-40  right-37 w-[80vw] h-[95vh] bg-gradient-to-tl from-purple-600 via-purple-500 to-zinc-400 opacity-40 blur-[90px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="text-gray-300  font-serif">
              Trusted by 10,000+ groups worldwide
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-['inter-beta'] text-white leading-[1.1] tracking-tight mb-6">
            Split expenses fairly with your group in seconds.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10">
            Our smart platform automatically tracks shared expenses, calculates
            fair shares, and shows exactly who owes whom. No more awkward
            conversations or manual calculations.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="px-6 py-3 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 relative">
          {/* Browser Chrome */}
          <div className="backdrop-blur-[200px] rounded-t-xl border border-white/10 p-3 flex items-center gap-4">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>

            {/* URL Bar */}
          </div>

          {/* Dashboard Content */}
          <div className="bg-[#0a0a0a] rounded-b-xl border border-t-0 border-white/10 overflow-hidden">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/ui/admin-dashboard/admin-full-1.png"
              alt="a"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
