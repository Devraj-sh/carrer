"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">AI</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            AI & I
          </h2>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <motion.a 
            href="#features"
            className="text-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            Features
          </motion.a>
          <motion.a 
            href="#games"
            className="text-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            Games
          </motion.a>
          <motion.a 
            href="#about"
            className="text-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            About
          </motion.a>
        </div>

        {/* CTA Button / User Menu */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome back!
            </span>
            <Button 
              variant="outline"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button 
            variant="hero"
            className="shadow-glow"
            onClick={() => window.location.href = '/auth'}
          >
            Get Started
          </Button>
        )}
      </div>
    </motion.nav>
  );
}