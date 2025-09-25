import React, { useState } from "react";
import { motion } from "framer-motion";
import { LandingPage } from "@/components/LandingPage";
import { StudentArena } from "@/components/StudentArena";
import { AdultLab } from "@/components/AdultLab";
import { SkillDashboard } from "@/components/SkillDashboard";
import { GameArena } from "@/components/GameArena";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Gamepad2, TrendingUp, Zap } from "lucide-react";
import heroBattleArena from "@/assets/hero-battle-arena.jpg";

type AppState = 
  | { screen: "landing" }
  | { screen: "student-arena" }
  | { screen: "adult-lab" }
  | { screen: "skill-dashboard"; userType: "student" | "adult" }
  | { screen: "game-arena"; gameId: string; userType: "student" | "adult" };

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ screen: "landing" });

  const handleAgeSelect = (ageGroup: "student" | "adult") => {
    if (ageGroup === "student") {
      setAppState({ screen: "student-arena" });
    } else {
      setAppState({ screen: "adult-lab" });
    }
  };

  const handleGameSelect = (gameId: string) => {
    const userType = appState.screen === "student-arena" ? "student" : "adult";
    setAppState({ screen: "game-arena", gameId, userType });
  };

  const handleBackToHome = () => {
    setAppState({ screen: "landing" });
  };

  const handleBackToArena = () => {
    if (appState.screen === "game-arena") {
      const userType = appState.userType;
      if (userType === "student") {
        setAppState({ screen: "student-arena" });
      } else {
        setAppState({ screen: "adult-lab" });
      }
    }
  };

  const handleViewSkillDashboard = (userType: "student" | "adult") => {
    setAppState({ screen: "skill-dashboard", userType });
  };

  // Authentication Notice Component
  const AuthNotice = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
    >
      <Card className="bg-card/90 backdrop-blur-sm border-primary/50 max-w-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            Ready to Save Your Progress?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground mb-3">
            Connect to Supabase to save your game progress, skill development, and career portfolio!
          </p>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs w-full justify-center py-2">
              <Gamepad2 className="h-3 w-3 mr-1" />
              Save Game Progress
            </Badge>
            <Badge variant="outline" className="text-xs w-full justify-center py-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              Track Skill Growth
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Demo Notice Component
  const DemoNotice = () => (
    <motion.div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Card className="bg-accent/20 backdrop-blur-sm border-accent/50">
        <CardContent className="px-4 py-2">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-accent font-semibold">Demo Mode</span>
            <span className="text-muted-foreground">- Connect Supabase for full functionality</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (appState.screen === "landing") {
    return (
      <>
        <LandingPage onAgeSelect={handleAgeSelect} />
        <DemoNotice />
        <AuthNotice />
      </>
    );
  }

  if (appState.screen === "student-arena") {
    return (
      <>
        <StudentArena 
          onGameSelect={handleGameSelect} 
          onBackToHome={handleBackToHome} 
        />
        {/* Quick Navigation */}
        <motion.div
          className="fixed top-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => handleViewSkillDashboard("student")}
            className="bg-secondary text-background hover:bg-secondary-glow shadow-lg"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            View Skills
          </Button>
        </motion.div>
        <DemoNotice />
      </>
    );
  }

  if (appState.screen === "adult-lab") {
    return (
      <>
        <AdultLab 
          onChallengeSelect={handleGameSelect} 
          onBackToHome={handleBackToHome} 
        />
        {/* Quick Navigation */}
        <motion.div
          className="fixed top-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => handleViewSkillDashboard("adult")}
            className="bg-secondary text-background hover:bg-secondary-glow shadow-lg"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            View Skills
          </Button>
        </motion.div>
        <DemoNotice />
      </>
    );
  }

  if (appState.screen === "skill-dashboard") {
    return (
      <>
        <SkillDashboard 
          userType={appState.userType} 
          onBackToHome={handleBackToHome} 
        />
        <DemoNotice />
      </>
    );
  }

  if (appState.screen === "game-arena") {
    return (
      <>
        <GameArena 
          gameId={appState.gameId}
          userType={appState.userType}
          onBackToArena={handleBackToArena}
        />
        <DemoNotice />
      </>
    );
  }

  return null;
};

export default Index;
