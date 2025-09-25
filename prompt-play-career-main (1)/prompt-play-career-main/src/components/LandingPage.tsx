import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Gamepad2, TrendingUp, Users, Zap, Target } from "lucide-react";

interface LandingPageProps {
  onAgeSelect: (ageGroup: "student" | "adult") => void;
}

export const LandingPage = ({ onAgeSelect }: LandingPageProps) => {
  const [selectedAge, setSelectedAge] = useState<"student" | "adult" | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Literacy",
      description: "Learn how AI works through interactive gameplay",
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "Gamified Learning",
      description: "Master skills through engaging Human vs AI challenges",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Career Guidance",
      description: "Discover your ideal career path with AI-powered insights",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Skill Mapping",
      description: "Track your progress with dynamic skill visualization",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary neon-glow">
              <Zap className="h-5 w-5 mr-2" />
              AI Powered Learning Platform
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            AI & I
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-secondary">
            THE DILEMMA
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Master the future of work through gamified Human vs AI challenges. 
            Build AI literacy, discover career paths, and unlock your potential.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" variants={itemVariants}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="interactive-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/20 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Age Selection */}
        <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Choose Your Learning Journey</h3>
            <p className="text-lg text-muted-foreground">Select your age group to get started with personalized content</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Students Mode */}
            <motion.div
              className={`relative cursor-pointer ${selectedAge === "student" ? "scale-105" : ""}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedAge("student")}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedAge === "student" 
                  ? "border-primary shadow-lg shadow-primary/25 neon-glow" 
                  : "border-border/50 hover:border-primary/50"
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-human-primary/20 text-human-primary w-fit">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">Students Mode</CardTitle>
                  <CardDescription className="text-lg">Ages 10-17</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-muted-foreground">6 Interactive Games vs AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-muted-foreground">Learn AI Basics & Critical Thinking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-muted-foreground">Build Creative & Problem-Solving Skills</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-muted-foreground">Career Discovery & Portfolio Building</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Adults Mode */}
            <motion.div
              className={`relative cursor-pointer ${selectedAge === "adult" ? "scale-105" : ""}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedAge("adult")}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedAge === "adult" 
                  ? "border-secondary shadow-lg shadow-secondary/25 neon-glow" 
                  : "border-border/50 hover:border-secondary/50"
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-ai-primary/20 text-ai-primary w-fit">
                    <Brain className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">Adults Mode</CardTitle>
                  <CardDescription className="text-lg">Ages 18+</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-sm text-muted-foreground">AI Mastery Lab Challenges</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-sm text-muted-foreground">Advanced Prompt Engineering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-sm text-muted-foreground">Ethical AI & Real-World Scenarios</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-sm text-muted-foreground">Career Readiness & Professional Skills</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA Button */}
          {selectedAge && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="lg"
                onClick={() => onAgeSelect(selectedAge)}
                className={`text-lg px-12 py-6 text-background font-semibold transition-all duration-300 ${
                  selectedAge === "student" 
                    ? "bg-human-primary hover:bg-human-secondary human-side" 
                    : "bg-ai-primary hover:bg-ai-secondary ai-side"
                } neon-glow hover:scale-105`}
              >
                Start Your {selectedAge === "student" ? "Learning" : "Mastery"} Journey
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};