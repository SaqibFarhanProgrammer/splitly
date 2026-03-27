// components/UseCasesSection.tsx
import { Plane, Home, Briefcase, Users } from 'lucide-react';

export function UseCasesSection() {
  const useCases = [
    {
      icon: Plane,
      title: 'Friends Going on Trips',
      desc: 'Weekend getaways, road trips, or international travel. Split petrol, hotels, food, and activities fairly.',
      image: '🏔️',
    },
    {
      icon: Home,
      title: 'Roommates',
      desc: 'Monthly rent, utilities, groceries, and shared household items. Keep track of recurring expenses easily.',
      image: '🏠',
    },
    {
      icon: Briefcase,
      title: 'Office Teams',
      desc: 'Team lunches, outings, gifts for colleagues, and office supplies. Manage corporate group expenses.',
      image: '💼',
    },
    {
      icon: Users,
      title: 'Family Events',
      desc: 'Weddings, birthdays, reunions, and festivals. Coordinate expenses among family members transparently.',
      image: '🎉',
    },
  ];

  return (
    <section id="use-cases" className="relative py-32 bg-black overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-zinc-600 text-sm font-medium mb-4 tracking-wide uppercase">
            Use Cases
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Perfect For Every Group
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            From friends to family, roommates to colleagues — anyone sharing
            expenses can benefit
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className="group relative bg-zinc-950 border border-zinc-900 rounded-3xl p-8 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300 overflow-hidden"
            >
              <div className="relative flex items-start gap-6">
                {/* Emoji/Image */}
                <div className="text-5xl grayscale group-hover:grayscale-0 transition-all duration-300 opacity-50 group-hover:opacity-100">
                  {useCase.image}
                </div>

                <div className="flex-1">
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4 group-hover:bg-zinc-800 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-all duration-300">
                    <useCase.icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    {useCase.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
