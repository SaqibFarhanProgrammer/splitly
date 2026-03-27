// components/SolutionSection.tsx
import { Check, Shield, Zap, Heart, ArrowRight } from 'lucide-react';

export function SolutionSection() {
  const benefits = [
    { icon: Zap, text: 'Automatic calculations' },
    { icon: Shield, text: '100% transparent' },
    { icon: Heart, text: 'No more awkwardness' },
    { icon: Check, text: 'Fair for everyone' },
  ];

  const steps = [
    {
      title: 'Create Group',
      desc: 'Start a group for your trip or event in seconds. Invite friends via link or email.',
      step: '01',
    },
    {
      title: 'Add Expenses',
      desc: 'Log expenses as they happen. Specify who paid and how to split among the group.',
      step: '02',
    },
    {
      title: 'Settle Up',
      desc: 'View automatic calculations and settle balances with one-click payments.',
      step: '03',
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block text-zinc-500 text-sm font-medium mb-4 tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Split expenses fairly
            <br />
            <span className="text-zinc-500">in three simple steps.</span>
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Expense Splitter automatically tracks expenses, calculates fair
            shares, and clearly shows who needs to pay whom. No confusion. No
            arguments.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {steps.map((item, i) => (
            <div key={i} className="group relative">
              <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-lg mb-6 group-hover:bg-zinc-700 group-hover:text-white transition-colors duration-300">
                  {item.step}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  {item.desc}
                </p>

                {/* Arrow for non-last items */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-16 w-8 h-8 items-center justify-center text-zinc-700">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
            >
              <benefit.icon className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
