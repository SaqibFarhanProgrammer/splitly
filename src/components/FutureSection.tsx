// components/FeaturesSection.tsx
import { Users, Calculator, FileText, History, Shield, Smartphone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Management",
      desc: "Create unlimited groups for different trips and events. Add members easily and manage multiple groups simultaneously.",
      color: "purple"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Automatic Splitting",
      desc: "Expenses are divided equally among participants automatically. No manual calculations needed, ever.",
      color: "pink"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Settlement Summary",
      desc: "Clear overview showing exactly who needs to pay whom. Minimize transactions with smart settlement suggestions.",
      color: "orange"
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Expense History",
      desc: "Complete transparent history of all expenses. Search and filter through past records anytime.",
      color: "blue"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Payment Integration",
      desc: "We don't handle your money. Settle via cash, bank transfer, or any method you prefer outside the app.",
      color: "green"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Friendly",
      desc: "Access your groups from any device. Optimized for phones, tablets, and desktops.",
      color: "red"
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-[#050505]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white mb-4">
            Key Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-[inter-light-betaa]">
            Everything you need to manage group expenses fairly and transparently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-purple-500/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 border border-${feature.color}-500/30 flex items-center justify-center text-${feature.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-[inter-bold] text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}