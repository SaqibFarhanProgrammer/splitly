// components/FeaturesSection.tsx
import {
  Users,
  Calculator,
  FileText,
  History,
  Shield,
  Smartphone,
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Group Management',
      desc: 'Create unlimited groups for different trips and events. Add members easily and manage multiple groups simultaneously.',
    },
    {
      icon: Calculator,
      title: 'Automatic Splitting',
      desc: 'Expenses are divided equally among participants automatically. No manual calculations needed, ever.',
    },
    {
      icon: FileText,
      title: 'Settlement Summary',
      desc: 'Clear overview showing exactly who needs to pay whom. Minimize transactions with smart settlement suggestions.',
    },
    {
      icon: History,
      title: 'Expense History',
      desc: 'Complete transparent history of all expenses. Search and filter through past records anytime.',
    },
    {
      icon: Shield,
      title: 'No Payment Integration',
      desc: "We don't handle your money. Settle via cash, bank transfer, or any method you prefer outside the app.",
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      desc: 'Access your groups from any device. Optimized for phones, tablets, and desktops.',
    },
  ];

  return (
    <section id="features" className="relative py-32 bg-black">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-zinc-600 text-sm font-medium mb-4 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Everything you need
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Manage group expenses fairly and transparently with our
            comprehensive toolset
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-zinc-950 border border-zinc-900 rounded-2xl p-8 hover:border-zinc-800 hover:bg-zinc-900/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-6 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-all duration-300">
                <feature.icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
