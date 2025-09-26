import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';

const Lab = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-human bg-clip-text text-transparent">
            🧪 AI Mastery Lab
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Advanced AI learning experiences for adults 18+
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { id: 'prompt-battle', title: 'Prompt Battle', icon: '⚔️', desc: 'Design better prompts than competitors' },
              { id: 'case-simulation', title: 'Case Simulation', icon: '💼', desc: 'Solve real-world problems with AI' },
              { id: 'coordination-lab', title: 'Coordination Lab', icon: '🤝', desc: 'Compare GPT, Claude, and Gemini' },
              { id: 'ethical-scenarios', title: 'Ethical AI Scenarios', icon: '⚖️', desc: 'Navigate complex AI ethics dilemmas' },
              { id: 'career-advisory', title: 'Career Advisory', icon: '🚀', desc: 'AI-powered career insights & skill tree' },
            ].map((lab, index) => (
              <motion.div
                key={lab.id}
                className="bg-card p-6 rounded-lg shadow-card border hover:shadow-human transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{lab.icon}</div>
                <h3 className="text-xl font-bold mb-2">{lab.title}</h3>
                <p className="text-muted-foreground mb-4">{lab.desc}</p>
                <Button variant="human" className="w-full">
                  Start Lab
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Lab;