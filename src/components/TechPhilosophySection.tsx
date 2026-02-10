// components/TechPhilosophySection.tsx
import { Code, Database, Server, Lock } from "lucide-react";

export function TechPhilosophySection() {
  return (
    <section className="relative py-24 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1a2e_0%,transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reliability
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-[inter-light-betaa]">
            Our technical approach prioritizes data integrity and calculation accuracy above all else.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Database className="w-6 h-6" />,
              title: "Dynamic Calculations",
              desc: "Balances are calculated on-demand from expense records, never stored totals",
              color: "purple"
            },
            {
              icon: <Server className="w-6 h-6" />,
              title: "Clean Data",
              desc: "Server validates all amounts, participants, and payers for data integrity",
              color: "pink"
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: "Simple Architecture",
              desc: "Focused on core functionality without unnecessary complexity",
              color: "orange"
            },
            {
              icon: <Lock className="w-6 h-6" />,
              title: "Secure",
              desc: "Your financial data is encrypted and protected at all times",
              color: "green"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/30 flex items-center justify-center text-${item.color}-400 mx-auto mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-[inter-bold] text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">System Operational</span>
          </div>
          <p className="text-gray-300 font-[inter-light-betaa] italic">
            &ldquo;We believe financial tools should be boringly reliable. No surprises, no hidden fees, just accurate calculations every single time.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
            <div>
              <p className="text-white font-medium">Engineering Team</p>
              <p className="text-gray-500 text-sm">Expense Splitter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}