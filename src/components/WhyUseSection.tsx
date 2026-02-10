// components/WhyUseSection.tsx
import { Clock, AlertCircle, Eye, Users } from "lucide-react";

export function WhyUseSection() {
  const reasons = [
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: "Saves Time",
      desc: "No more spreadsheets or manual calculations. What used to take hours now takes seconds.",
      stat: "10x",
      statLabel: "Faster"
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-pink-400" />,
      title: "Zero Errors",
      desc: "Automated calculations eliminate human error. Every split is mathematically accurate.",
      stat: "100%",
      statLabel: "Accurate"
    },
    {
      icon: <Eye className="w-6 h-6 text-orange-400" />,
      title: "Full Transparency",
      desc: "Everyone sees the same data. No hidden expenses or confusion about who paid what.",
      stat: "24/7",
      statLabel: "Visibility"
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      title: "Any Group Size",
      desc: "Works perfectly for small friend groups or large events with dozens of participants.",
      stat: "∞",
      statLabel: "Scalable"
    }
  ];

  return (
    <section className="relative py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white leading-tight mb-6">
              Why Use Expense Splitter?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-[inter-light-betaa]">
              Built with simplicity and correctness in mind. We focus on accurate data storage and reliable calculations rather than unnecessary complexity.
            </p>
            
            <button className="bg-white text-black px-8 py-4 rounded-full font-[inter-bold] hover:bg-gray-100 transition-all hover:scale-105">
              Start For Free
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div 
                key={i} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all group"
              >
                <div className="mb-4">{reason.icon}</div>
                <div className="text-3xl font-[inter-bold] text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {reason.stat}
                </div>
                <div className="text-sm text-gray-500 mb-3">{reason.statLabel}</div>
                <h3 className="text-lg font-[inter-bold] text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}