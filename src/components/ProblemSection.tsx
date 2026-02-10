// components/ProblemSection.tsx
import { AlertTriangle, Users, Calculator, MessageSquare } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: <Users className="w-6 h-6 text-red-400" />,
      title: "Uneven Payments",
      desc: "One person often pays more than others, creating imbalance"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
      title: "Forgotten Expenses",
      desc: "People forget who paid what, leading to disputes"
    },
    {
      icon: <Calculator className="w-6 h-6 text-yellow-400" />,
      title: "Manual Errors",
      desc: "Manual calculations cause confusion and arguments"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: "Awkward Conversations",
      desc: "Small expenses add up and become hard to track"
    }
  ];

  return (
    <section className="relative py-24 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white leading-tight mb-6">
              Managing Group Expenses Is{" "}
              <span className="text-gray-500">Messy</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-[inter-light-betaa]">
              Trips and group activities often lead to confusion about who paid and who owes money. Manual tracking causes errors, stress, and awkward conversations that can ruin relationships.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {problems.map((problem, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors">
                  <div className="mb-3">{problem.icon}</div>
                  <h3 className="text-white font-medium mb-1">{problem.title}</h3>
                  <p className="text-gray-500 text-sm">{problem.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400 text-sm">Group Chat</span>
                <span className="text-gray-600 text-xs">3 unread</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Ahmed", msg: "Guys, I paid ₹24,000 for the hotel. Don't forget!", time: "2h ago", self: false },
                  { name: "Saqib", msg: "Wait, didn't I give you ₹5,000 already?", time: "1h ago", self: false },
                  { name: "Ali", msg: "I thought that was for petrol?", time: "45m ago", self: false },
                  { name: "You", msg: "Can someone calculate who owes what? I'm confused 😅", time: "Now", self: true },
                ].map((chat, i) => (
                  <div key={i} className={`flex gap-3 ${chat.self ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${chat.self ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'}`}>
                      {chat.name[0]}
                    </div>
                    <div className={`max-w-[80%] ${chat.self ? 'text-right' : ''}`}>
                      <div className={`inline-block px-4 py-2 rounded-2xl text-sm ${chat.self ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'}`}>
                        {chat.msg}
                      </div>
                      <p className="text-gray-600 text-xs mt-1">{chat.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}