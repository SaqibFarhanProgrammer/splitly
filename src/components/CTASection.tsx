// components/CTASect
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-gray-300 text-sm">Free forever for basic use</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-[inter-bold] text-white leading-tight mb-6">
          Ready to Split Expenses{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Fairly?
          </span>
        </h2>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto font-[inter-light-betaa]">
          Join thousands of groups who trust Expense Splitter for transparent and fair expense management.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-[inter-bold] text-lg hover:bg-gray-100 transition-all hover:scale-105 w-full sm:w-auto justify-center">
            Create Free Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto">
            Contact Sales
          </button>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          No credit card required • Set up in 30 seconds • Cancel anytime
        </p>
      </div>
    </section>
  );
}
