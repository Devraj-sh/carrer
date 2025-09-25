import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Briefcase, 
  UserCheck, 
  Users, 
  Scale, 
  Trophy,
  Brain,
  Target,
  TrendingUp,
  Settings,
  Star
} from "lucide-react";

interface AdultLabProps {
  onChallengeSelect: (challengeId: string) => void;
  onBackToHome: () => void;
}

export const AdultLab = ({ onChallengeSelect, onBackToHome }: AdultLabProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [professionalStats] = useState({
    mastery: 85,
    completedChallenges: 28,
    skillRating: 4.7,
    careerReadiness: 92,
  });

  const challenges = [
    {
      id: "prompt-battles",
      title: "Prompt Battles",
      description: "Master the art of AI prompt engineering through competitive challenges",
      icon: <Zap className="h-6 w-6" />,
      category: "Engineering",
      difficulty: "Advanced",
      skills: ["Prompt Engineering", "AI Optimization", "Creative Problem Solving"],
      completion: 75,
      points: 450,
    },
    {
      id: "case-simulations",
      title: "Case Simulations",
      description: "Solve complex real-world business problems alongside AI",
      icon: <Briefcase className="h-6 w-6" />,
      category: "Strategy",
      difficulty: "Expert",
      skills: ["Strategic Thinking", "Business Analysis", "AI Collaboration"],
      completion: 60,
      points: 520,
    },
    {
      id: "ai-mentor",
      title: "AI Mentor Roleplay",
      description: "Navigate domain-specific challenges in design, data, and content",
      icon: <UserCheck className="h-6 w-6" />,
      category: "Specialization",
      difficulty: "Advanced",
      skills: ["Domain Expertise", "Mentoring", "Professional Communication"],
      completion: 85,
      points: 380,
    },
    {
      id: "co-creation",
      title: "Co-Creation Challenges",
      description: "Collaborate with AI to produce innovative solutions and content",
      icon: <Users className="h-6 w-6" />,
      category: "Collaboration",
      difficulty: "Intermediate",
      skills: ["Creative Collaboration", "Innovation", "Iterative Design"],
      completion: 90,
      points: 340,
    },
    {
      id: "ethical-dilemmas",
      title: "Ethical Dilemmas",
      description: "Navigate complex AI ethics, bias, privacy, and societal impact scenarios",
      icon: <Scale className="h-6 w-6" />,
      category: "Ethics",
      difficulty: "Expert",
      skills: ["Ethical Reasoning", "Bias Detection", "Policy Understanding"],
      completion: 45,
      points: 600,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Intermediate":
        return "bg-blue-500";
      case "Advanced":
        return "bg-purple-500";
      case "Expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Engineering":
        return "skill-technical";
      case "Strategy":
        return "skill-critical";
      case "Specialization":
        return "skill-communication";
      case "Collaboration":
        return "skill-collaboration";
      case "Ethics":
        return "skill-logic";
      default:
        return "skill-technical";
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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-ai-primary/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
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
              className="mb-4 border-secondary text-secondary hover:bg-secondary hover:text-background"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
              AI Mastery Lab
            </h1>
            <p className="text-lg text-muted-foreground">
              Advanced challenges for AI professionals and enthusiasts
            </p>
          </div>
          
          {/* Professional Stats */}
          <div className="hidden lg:block">
            <Card className="bg-card/50 backdrop-blur-sm border-secondary/30">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-lg">Mastery Level</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Mastery</span>
                  <Badge variant="secondary" className="text-secondary">
                    {professionalStats.mastery}%
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Skill Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-foreground font-semibold">
                        {professionalStats.skillRating}
                      </span>
                    </div>
                  </div>
                  <Progress value={professionalStats.skillRating * 20} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="text-sm text-foreground font-semibold">
                    {professionalStats.completedChallenges}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Career Ready</span>
                  <Badge className="bg-green-500 text-white">
                    {professionalStats.careerReadiness}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedChallenge(challenge.id);
                onChallengeSelect(challenge.id);
              }}
            >
              <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-secondary/50 interactive-card ${
                selectedChallenge === challenge.id ? "border-secondary neon-glow" : ""
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-full bg-${getCategoryColor(challenge.category)}/20 text-${getCategoryColor(challenge.category).replace('skill-', '')}`}>
                      {challenge.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="outline"
                        className={`${getDifficultyColor(challenge.difficulty)} text-white border-0`}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {challenge.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Professional Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {challenge.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-secondary/20 text-secondary border-secondary/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress and Points */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Completion</span>
                        <span className="text-sm text-foreground font-semibold">
                          {challenge.completion}%
                        </span>
                      </div>
                      <Progress value={challenge.completion} className="h-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{challenge.points}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                  </div>

                  {/* Challenge Button */}
                  <Button
                    className="w-full ai-side text-background font-semibold hover:scale-105 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChallengeSelect(challenge.id);
                    }}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Start Challenge
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
          <Card className="bg-card/50 backdrop-blur-sm border-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                Professional Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{professionalStats.mastery}%</div>
                  <div className="text-sm text-muted-foreground">AI Mastery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{professionalStats.completedChallenges}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Career Readiness</span>
                  <span className="text-sm">{professionalStats.careerReadiness}%</span>
                </div>
                <Progress value={professionalStats.careerReadiness} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};