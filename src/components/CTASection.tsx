// components/CTASection.tsx
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Multi-layer Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[100px] animate-pulse pointer-events-none [animation-delay:1s]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-10 hover:bg-white/10 transition-colors cursor-pointer">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-zinc-300 text-sm font-medium">Free forever for basic use</span>
        </div>
        
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
          Ready to Split Expenses{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Fairly?
          </span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of groups who trust Expense Splitter for transparent and fair expense management.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button - Gradient */}
          <button className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 transition-all group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          
          {/* Secondary Button - Outline */}
          <button className="group px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto relative overflow-hidden">
            <span className="relative z-10">Contact Sales</span>
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            No credit card required
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Set up in 30 seconds
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}