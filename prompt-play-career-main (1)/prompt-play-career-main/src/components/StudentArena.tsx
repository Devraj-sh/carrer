import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  Puzzle, 
  Palette, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Trophy,
  Zap,
  Brain,
  Star
} from "lucide-react";

interface StudentArenaProps {
  onGameSelect: (gameId: string) => void;
  onBackToHome: () => void;
}

export const StudentArena = ({ onGameSelect, onBackToHome }: StudentArenaProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [playerStats] = useState({
    level: 3,
    xp: 750,
    totalXp: 1000,
    gamesWon: 12,
    skillPoints: 850,
  });

  const games = [
    {
      id: "spot-ai",
      title: "Spot the AI",
      description: "Can you tell what's human-made vs AI-generated?",
      icon: <Eye className="h-6 w-6" />,
      difficulty: "Beginner",
      color: "skill-logic",
      skills: ["Critical Thinking", "AI Awareness"],
      progress: 75,
    },
    {
      id: "puzzle-duel",
      title: "Puzzle Duel",
      description: "Race against AI to solve mind-bending puzzles",
      icon: <Puzzle className="h-6 w-6" />,
      difficulty: "Medium",
      color: "skill-technical",
      skills: ["Problem Solving", "Logic"],
      progress: 45,
    },
    {
      id: "story-battle",
      title: "Story/Art Battle",
      description: "Unleash your creativity against AI storytelling",
      icon: <Palette className="h-6 w-6" />,
      difficulty: "Easy",
      color: "skill-creativity",
      skills: ["Creativity", "Imagination"],
      progress: 90,
    },
    {
      id: "fact-check",
      title: "Fact Check Arena",
      description: "Identify fake news and misinformation",
      icon: <ShieldCheck className="h-6 w-6" />,
      difficulty: "Medium",
      color: "skill-critical",
      skills: ["Digital Literacy", "Critical Analysis"],
      progress: 30,
    },
    {
      id: "teach-battle",
      title: "You Teach, AI Teaches",
      description: "Explain concepts better than AI can",
      icon: <Users className="h-6 w-6" />,
      difficulty: "Hard",
      color: "skill-communication",
      skills: ["Communication", "Teaching"],
      progress: 15,
    },
    {
      id: "pattern-guess",
      title: "Guess the Pattern",
      description: "Predict data patterns like a machine learning model",
      icon: <TrendingUp className="h-6 w-6" />,
      difficulty: "Hard",
      color: "skill-technical",
      skills: ["Pattern Recognition", "ML Basics"],
      progress: 60,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-human-primary/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ai-primary/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="mb-4 border-primary text-primary hover:bg-primary hover:text-background"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
              Student Arena
            </h1>
            <p className="text-lg text-muted-foreground">
              Challenge AI in 6 exciting games and build your skills!
            </p>
          </div>
          
          {/* Player Stats */}
          <div className="hidden lg:block">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Player Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <Badge variant="secondary" className="text-primary">
                    {playerStats.level}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">XP</span>
                    <span className="text-sm text-foreground">
                      {playerStats.xp}/{playerStats.totalXp}
                    </span>
                  </div>
                  <Progress value={(playerStats.xp / playerStats.totalXp) * 100} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Games Won</span>
                  <span className="text-sm text-foreground font-semibold">
                    {playerStats.gamesWon}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Skill Points</span>
                  <span className="text-sm text-foreground font-semibold">
                    {playerStats.skillPoints}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedGame(game.id);
                onGameSelect(game.id);
              }}
            >
              <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 interactive-card ${
                selectedGame === game.id ? "border-primary neon-glow" : ""
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-full bg-${game.color}/20 text-${game.color.replace('skill-', '')}`}>
                      {game.icon}
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(game.difficulty)} text-white border-0`}
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{game.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills Developed:</p>
                    <div className="flex flex-wrap gap-1">
                      {game.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-primary/20 text-primary border-primary/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Your Progress</span>
                      <span className="text-sm text-foreground font-semibold">
                        {game.progress}%
                      </span>
                    </div>
                    <Progress value={game.progress} className="h-2" />
                  </div>

                  {/* Play Button */}
                  <Button
                    className="w-full human-side text-background font-semibold hover:scale-105 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGameSelect(game.id);
                    }}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats for Mobile */}
        <motion.div
          className="lg:hidden mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Player Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{playerStats.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{playerStats.gamesWon}</div>
                  <div className="text-sm text-muted-foreground">Games Won</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="text-sm">{playerStats.xp}/{playerStats.totalXp} XP</span>
                </div>
                <Progress value={(playerStats.xp / playerStats.totalXp) * 100} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};