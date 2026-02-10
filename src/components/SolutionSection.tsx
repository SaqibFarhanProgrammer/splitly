// components/SolutionSection.tsx
import { Check, Shield, Zap, Heart } from "lucide-react";

export function SolutionSection() {
  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "Automatic calculations" },
    { icon: <Shield className="w-5 h-5" />, text: "100% transparent" },
    { icon: <Heart className="w-5 h-5" />, text: "No more awkwardness" },
    { icon: <Check className="w-5 h-5" />, text: "Fair for everyone" },
  ];

  return (
    <section className="relative py-24 bg-[##000000]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white leading-tight mb-6">
            A Simple Way to Split Expenses{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fairly
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-[inter-light-betaa]">
            Expense Splitter automatically tracks expenses, calculates fair shares, and clearly shows who needs to pay whom. No confusion. No arguments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Create Group",
              desc: "Start a group for your trip or event in seconds",
              step: "01",
              color: "from-purple-500 to-purple-600"
            },
            {
              title: "Add Expenses",
              desc: "Log expenses as they happen with who paid and who shared",
              step: "02",
              color: "from-pink-500 to-pink-600"
            },
            {
              title: "Settle Up",
              desc: "View automatic calculations and settle balances easily",
              step: "03",
              color: "from-orange-500 to-orange-600"
            }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity blur" />
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} text-white font-[inter-bold] text-lg mb-6`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-[inter-bold] text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-purple-400">{benefit.icon}</span>
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}