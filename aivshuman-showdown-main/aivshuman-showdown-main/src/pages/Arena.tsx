import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';

const Arena = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-ai bg-clip-text text-transparent">
            🎮 Gamified AI Arena
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Challenge AI in fun games designed for students aged 10-17
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { id: 'spot-ai', title: 'Spot the AI', icon: '🔍', desc: 'Can you detect AI vs Human content?' },
              { id: 'puzzle-duel', title: 'Puzzle Duel', icon: '🧩', desc: 'Logic puzzles against AI' },
              { id: 'story-battle', title: 'Story Battle', icon: '📚', desc: 'Creative writing competition' },
              { id: 'fact-check', title: 'Fact Check Arena', icon: '🎯', desc: 'Real vs fake headlines' },
              { id: 'teaching', title: 'Teaching Challenge', icon: '🎓', desc: 'Explain concepts better than AI' },
              { id: 'pattern', title: 'Pattern Master', icon: '🔮', desc: 'Predict missing sequences' },
            ].map((game, index) => (
              <motion.div
                key={game.id}
                className="bg-card p-6 rounded-lg shadow-card border hover:shadow-ai transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-muted-foreground mb-4">{game.desc}</p>
                <Button variant="ai" className="w-full">
                  Play Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Arena;