// components/HowItWorksSection.tsx
import { Plus, Receipt, PieChart, Banknote } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Plus,
      title: 'Create a Group',
      desc: 'Start by creating a group for your trip, event, or shared living situation. Invite all members via link or email.',
    },
    {
      icon: Receipt,
      title: 'Add Expenses',
      desc: 'Whenever someone pays, add it to the app. Specify who paid and who should share the cost. The system handles the math.',
    },
    {
      icon: PieChart,
      title: 'View Calculations',
      desc: 'See automatic balance calculations for every member. Know exactly who owes money and who should receive it.',
    },
    {
      icon: Banknote,
      title: 'Settle Balances',
      desc: 'Use the settlement summary to pay each other outside the app. Mark payments as settled to keep records clean.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-zinc-500 text-sm font-medium mb-4 tracking-wide uppercase">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            How It Works
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps to manage your group expenses without any hassle
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connection Line - Minimal */}
          <div className="absolute top-12 left-[12%] right-[12%] h-px bg-zinc-800 hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 h-full">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 text-xs font-medium z-20 group-hover:bg-zinc-700 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 mb-6 group-hover:bg-zinc-800 group-hover:text-zinc-300 transition-all duration-300">
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
