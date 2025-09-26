"use client";

import { motion } from 'framer-motion';

export function FeaturesSection() {
  const features = [
    {
      icon: '🎮',
      title: 'Gamified Learning',
      description: 'Turn AI education into an exciting game with levels, achievements, and competitive challenges.',
      gradient: 'bg-gradient-ai'
    },
    {
      icon: '🧠',
      title: 'Skill Development',
      description: 'Build critical thinking, creativity, and AI literacy through interactive experiences.',
      gradient: 'bg-gradient-human'
    },
    {
      icon: '🤖',
      title: 'Real AI Integration',
      description: 'Compete against actual AI models including GPT, Claude, and Gemini in real-time.',
      gradient: 'bg-gradient-ai'
    },
    {
      icon: '🏆',
      title: 'Progress Tracking',
      description: 'Monitor your growth with detailed analytics, badges, and personalized insights.',
      gradient: 'bg-gradient-human'
    },
    {
      icon: '🎓',
      title: 'Age-Appropriate Paths',
      description: 'Tailored experiences for students (10-17) and professionals (18+) with different complexity levels.',
      gradient: 'bg-gradient-ai'
    },
    {
      icon: '🌟',
      title: 'Future-Ready Skills',
      description: 'Prepare for an AI-powered world with hands-on experience in prompt engineering and AI ethics.',
      gradient: 'bg-gradient-human'
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Why Choose AI & I?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of AI education through interactive challenges designed to enhance human potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-lg shadow-card border hover:shadow-glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}