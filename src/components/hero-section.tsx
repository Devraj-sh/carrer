"use client";

import { motion } from 'framer-motion';
import { Avatar3D } from './ui/avatar-3d';
import { Button } from './ui/button';
import { useState } from 'react';

export function HeroSection() {
  const [hoveredPath, setHoveredPath] = useState<'arena' | 'lab' | null>(null);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* AI vs Human Duel */}
      <motion.div 
        className="flex items-center gap-8 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Avatar3D 
          type="human" 
          isActive={hoveredPath === 'arena'} 
          className="animate-float"
        />
        
        <motion.div 
          className="text-6xl font-bold text-primary bg-gradient-hero bg-clip-text text-transparent"
          animate={{ 
            scale: hoveredPath ? [1, 1.2, 1] : 1,
            rotate: hoveredPath ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 0.5 }}
        >
          VS
        </motion.div>
        
        <div className="animate-float" style={{ animationDelay: '1s' }}>
          <Avatar3D 
            type="ai" 
            isActive={hoveredPath === 'lab'} 
            className=""
          />
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
          Challenge AI, Unlock Skills, Discover Your Potential
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          The ultimate platform where humans and AI compete, collaborate, and learn together
        </p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            variant="arena"
            size="xl"
            className="group relative overflow-hidden"
            onMouseEnter={() => setHoveredPath('arena')}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => window.location.href = '/arena'}
          >
            <motion.span 
              className="text-2xl mr-3"
              animate={{ rotate: hoveredPath === 'arena' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              🎮
            </motion.span>
            <div className="flex flex-col">
              <span className="text-lg font-bold">Enter Arena</span>
              <span className="text-sm opacity-80">Students 10-17</span>
            </div>
          </Button>

          <Button 
            variant="lab"
            size="xl"
            className="group relative overflow-hidden"
            onMouseEnter={() => setHoveredPath('lab')}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => window.location.href = '/lab'}
          >
            <motion.span 
              className="text-2xl mr-3"
              animate={{ rotate: hoveredPath === 'lab' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              🧪
            </motion.span>
            <div className="flex flex-col">
              <span className="text-lg font-bold">Mastery Lab</span>
              <span className="text-sm opacity-80">Adults 18+</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}