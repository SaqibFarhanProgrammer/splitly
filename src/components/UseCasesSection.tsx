// components/UseCasesSection.tsx
import { Plane, Home, Briefcase, Users } from "lucide-react";

export function UseCasesSection() {
  const useCases = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Friends Going on Trips",
      desc: "Weekend getaways, road trips, or international travel. Split petrol, hotels, food, and activities fairly.",
      image: "🏔️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Roommates",
      desc: "Monthly rent, utilities, groceries, and shared household items. Keep track of recurring expenses easily.",
      image: "🏠",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Office Teams",
      desc: "Team lunches, outings, gifts for colleagues, and office supplies. Manage corporate group expenses.",
      image: "💼",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Events",
      desc: "Weddings, birthdays, reunions, and festivals. Coordinate expenses among family members transparently.",
      image: "🎉",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="use-cases" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[inter-bold] text-white mb-4">
            Perfect For Every Group
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-[inter-light-betaa]">
            From friends to family, roommates to colleagues — anyone sharing expenses can benefit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => (
            <div 
              key={i} 
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${useCase.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative flex items-start gap-6">
                <div className="text-6xl">{useCase.image}</div>
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white mb-4`}>
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-[inter-bold] text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{useCase.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}