// components/ProblemSection.tsx
import { AlertTriangle, Users, Calculator, MessageSquare } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Users,
      title: "Uneven Payments",
      desc: "One person often pays more, creating financial imbalance in the group."
    },
    {
      icon: AlertTriangle,
      title: "Forgotten Expenses",
      desc: "People forget who paid what, leading to disputes and mistrust."
    },
    {
      icon: Calculator,
      title: "Manual Errors",
      desc: "Spreadsheet calculations cause confusion and costly mistakes."
    },
    {
      icon: MessageSquare,
      title: "Awkward Conversations",
      desc: "Chasing friends for money strains relationships over time."
    }
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              Managing group expenses
              <br />
              <span className="text-zinc-500">shouldn't be complicated.</span>
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed mb-12 max-w-lg">
              Group trips and shared activities often lead to confusion about who paid 
              and who owes what. Manual tracking creates stress that can damage friendships.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {problems.map((problem, i) => (
                <div 
                  key={i} 
                  className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="mb-4 p-2 bg-zinc-800/50 rounded-lg w-fit group-hover:bg-zinc-800 transition-colors">
                    <problem.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2 text-sm">{problem.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{problem.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Subtle Glow */}
            <div className="absolute -inset-4 bg-zinc-800/20 rounded-3xl blur-3xl" />
            
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <span className="text-zinc-400 text-sm font-medium">Trip Expenses</span>
                <span className="text-zinc-600 text-xs bg-zinc-800/50 px-2 py-1 rounded">3 members</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Ahmed", msg: "Paid ₹24,000 for hotel booking", time: "2h ago", amount: "+₹24,000", type: "credit" },
                  { name: "Saqib", msg: "Transferred to Ahmed", time: "1h ago", amount: "-₹8,000", type: "debit" },
                  { name: "Ali", msg: "Paid for dinner", time: "45m ago", amount: "+₹3,200", type: "credit" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-medium text-sm">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-zinc-500 text-xs">{item.msg}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${item.type === 'credit' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-500 text-sm">Total Balance</span>
                <span className="text-white font-semibold">₹19,200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}