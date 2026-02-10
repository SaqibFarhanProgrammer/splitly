// components/HowItWorksSection.tsx
import { Plus, Receipt, PieChart, Banknote } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Plus className="w-8 h-8" />,
      title: "Create a Group",
      desc: "Start by creating a group for your trip, event, or shared living situation. Invite all members via link or email.",
      color: "purple"
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "Add Expenses",
      desc: "Whenever someone pays, add it to the app. Specify who paid and who should share the cost. The system handles the math.",
      color: "pink"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "View Calculations",
      desc: "See automatic balance calculations for every member. Know exactly who owes money and who should receive it.",
      color: "orange"
    },
    {
      icon: <Banknote className="w-8 h-8" />,
      title: "Settle Balances",
      desc: "Use the settlement summary to pay each other outside the app. Mark payments as settled to keep records clean.",
      color: "green"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-[inter-light-betaa]">
            Four simple steps to manage your group expenses without any hassle
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 hover:border-purple-500/50 transition-colors">
                  <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 border border-${step.color}-500/30 flex items-center justify-center text-${step.color}-400 mb-6 mx-auto lg:mx-0`}>
                    {step.icon}
                  </div>
                  <div className="hidden lg:block absolute -top-3 left-6 w-6 h-6 rounded-full bg-black border-2 border-purple-500 z-20" />
                  <h3 className="text-xl font-[inter-bold] text-white mb-3 text-center lg:text-left">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}