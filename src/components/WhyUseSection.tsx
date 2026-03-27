// components/WhyUseSection.tsx
import { Clock, AlertCircle, Eye, Users } from 'lucide-react';

export function WhyUseSection() {
  const reasons = [
    {
      icon: Clock,
      title: 'Saves Time',
      desc: 'No more spreadsheets or manual calculations. What used to take hours now takes seconds.',
      stat: '10x',
      statLabel: 'Faster',
    },
    {
      icon: AlertCircle,
      title: 'Zero Errors',
      desc: 'Automated calculations eliminate human error. Every split is mathematically accurate.',
      stat: '100%',
      statLabel: 'Accurate',
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      desc: 'Everyone sees the same data. No hidden expenses or confusion about who paid what.',
      stat: '24/7',
      statLabel: 'Visibility',
    },
    {
      icon: Users,
      title: 'Any Group Size',
      desc: 'Works perfectly for small friend groups or large events with dozens of participants.',
      stat: '∞',
      statLabel: 'Scalable',
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-zinc-600 text-sm font-medium mb-4 tracking-wide uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              Why Use Expense Splitter?
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-lg">
              Built with simplicity and correctness in mind. We focus on
              accurate data storage and reliable calculations rather than
              unnecessary complexity.
            </p>

            <button className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-zinc-200 transition-all duration-200">
              Start For Free
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="group bg-zinc-950 border border-zinc-900 rounded-2xl p-6 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4 group-hover:bg-zinc-800 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-all duration-300">
                  <reason.icon className="w-5 h-5" />
                </div>

                {/* Stat */}
                <div className="text-3xl font-semibold text-white mb-1">
                  {reason.stat}
                </div>
                <div className="text-sm text-zinc-600 mb-4">
                  {reason.statLabel}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
