// components/TechPhilosophySection.tsx
import { Code, Database, Server, Lock } from 'lucide-react';

export function TechPhilosophySection() {
  const items = [
    {
      icon: Database,
      title: 'Dynamic Calculations',
      desc: 'Balances are calculated on-demand from expense records, never stored totals',
    },
    {
      icon: Server,
      title: 'Clean Data',
      desc: 'Server validates all amounts, participants, and payers for data integrity',
    },
    {
      icon: Code,
      title: 'Simple Architecture',
      desc: 'Focused on core functionality without unnecessary complexity',
    },
    {
      icon: Lock,
      title: 'Secure',
      desc: 'Your financial data is encrypted and protected at all times',
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#18181b_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block text-zinc-600 text-sm font-medium mb-4 tracking-wide uppercase">
            Technical Excellence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Built for <span className="text-zinc-500">Reliability</span>
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Our technical approach prioritizes data integrity and calculation
            accuracy above all else.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group bg-zinc-950 border border-zinc-900 rounded-2xl p-6 text-center hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-5 group-hover:bg-zinc-800 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Block */}
        <div className="mt-20 bg-zinc-950 border border-zinc-900 rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-zinc-600 animate-pulse" />
            <span className="text-zinc-500 text-sm font-medium uppercase tracking-wide">
              System Operational
            </span>
          </div>

          <blockquote className="text-zinc-300 text-lg leading-relaxed mb-8 border-l-2 border-zinc-800 pl-6 italic">
            "We believe financial tools should be boringly reliable. No
            surprises, no hidden fees, just accurate calculations every single
            time."
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 text-sm font-medium">
              ES
            </div>
            <div>
              <p className="text-white font-medium text-sm">Engineering Team</p>
              <p className="text-zinc-600 text-xs">Expense Splitter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
