import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SpotTheAI } from "@/components/games/SpotTheAI";
import { PuzzleDuel } from "@/components/games/PuzzleDuel";
import { useGameSession } from "@/hooks/useGameSession";
import { 
  User, 
  Bot, 
  Zap, 
  Trophy, 
  Clock, 
  Heart,
  Star,
  Volume2,
  VolumeX,
  Brain
} from "lucide-react";

interface GameArenaProps {
  gameId: string;
  userType: "student" | "adult";
  onBackToArena: () => void;
}

export const GameArena = ({ gameId, userType, onBackToArena }: GameArenaProps) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [humanScore, setHumanScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<"intro" | "playing" | "ai-turn" | "results">("intro");
  const [timeLeft, setTimeLeft] = useState(30);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const { sessionId, answers, skills, startSession, recordAnswer, endSession } = useGameSession(gameId, userType);

  const gameData = {
    "spot-ai": {
      title: "Spot the AI",
      description: "Can you identify which content was created by AI vs humans?",
      rounds: 5,
      component: SpotTheAI,
    },
    "puzzle-duel": {
      title: "Puzzle Duel", 
      description: "Race against AI to solve challenging puzzles",
      rounds: 3,
      component: PuzzleDuel,
    },
    "story-battle": {
      title: "Story Battle",
      description: "Create stories and compete with AI creativity",
      rounds: 4,
      component: SpotTheAI, // Placeholder - would need StoryBattle component
    },
    "fact-check": {
      title: "Fact Check Arena",
      description: "Identify fake news and misinformation",
      rounds: 5,
      component: SpotTheAI, // Placeholder - would need FactCheck component
    },
    "teach-ai": {
      title: "You Teach, AI Teaches",
      description: "Explain concepts and compare with AI",
      rounds: 3,
      component: SpotTheAI, // Placeholder - would need TeachAI component
    },
    "pattern-guess": {
      title: "Guess the Pattern",
      description: "Predict patterns in data and sequences",
      rounds: 4,
      component: PuzzleDuel, // Similar logic-based component
    },
  };

  const currentGame = gameData[gameId as keyof typeof gameData] || gameData["spot-ai"];

  useEffect(() => {
    if (gamePhase === "intro") {
      startSession();
    }
  }, [gamePhase, startSession]);

  useEffect(() => {
    if (gamePhase === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gamePhase, timeLeft]);

  const handleAnswer = async (correct: boolean, responseTime: number, answer: string) => {
    const skillUpdate = await recordAnswer({
      questionId: currentRound,
      userAnswer: answer,
      correct,
      responseTime,
      aiExplanation: "AI analyzed the pattern and determined the optimal solution."
    });

    if (correct) {
      setHumanScore(humanScore + 1);
    } else {
      setAiScore(aiScore + 1);
    }

    // Move to next round after a delay
    setTimeout(() => {
      if (currentRound < currentGame.rounds) {
        setCurrentRound(currentRound + 1);
        setGamePhase("playing");
        setTimeLeft(30);
      } else {
        setGamePhase("results");
        endSession();
      }
    }, 3000);
  };

  const startGame = () => {
    setGamePhase("playing");
  };

  const AIAvatar = () => (
    <motion.div
      className="relative"
      animate={aiSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, repeat: aiSpeaking ? Infinity : 0 }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center">
        <Bot className="h-12 w-12 text-white" />
      </div>
      {aiSpeaking && (
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <Zap className="h-3 w-3 text-background" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const HumanAvatar = () => (
    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-human-primary to-human-secondary flex items-center justify-center">
      <User className="h-12 w-12 text-white" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-human-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-ai-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <Button
              variant="outline"
              onClick={onBackToArena}
              className="mb-4 border-primary text-primary hover:bg-primary hover:text-background"
            >
              ← Back to Arena
            </Button>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {currentGame.title}
            </h1>
            <p className="text-muted-foreground">{currentGame.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-muted-foreground hover:text-foreground"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Battle Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Human Side */}
          <motion.div
            className="text-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-human-primary/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <HumanAvatar />
                </div>
                <CardTitle className="text-human-primary">HUMAN</CardTitle>
                <CardDescription>That's You!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-human-primary mb-2">{humanScore}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
                
                <div className="mt-6">
                  <Badge 
                    variant="secondary"
                    className="w-full justify-center py-2"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Ready to Play
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Center */}
          <motion.div
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Round Progress */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Round {currentRound} of {currentGame.rounds}</CardTitle>
                </div>
                <Progress value={(currentRound / currentGame.rounds) * 100} className="h-3" />
              </CardHeader>
            </Card>

            {/* Game Challenge */}
            <Card className="bg-card/50 backdrop-blur-sm border-accent/30 min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-center text-xl gradient-text">
                  {gamePhase === "intro" && "Get Ready!"}
                  {gamePhase === "playing" && `Round ${currentRound} of ${currentGame.rounds}`}
                  {gamePhase === "results" && "Game Complete!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gamePhase === "intro" && (
                  <div className="space-y-4 text-center">
                    <p className="text-muted-foreground text-lg">{currentGame.description}</p>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h3 className="font-semibold mb-2">How to Play:</h3>
                      <p className="text-sm text-muted-foreground">
                        Answer questions correctly and quickly to earn points. 
                        Compete against AI and improve your skills!
                      </p>
                    </div>
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-glow"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Game
                    </Button>
                  </div>
                )}

                {gamePhase === "playing" && (
                  <div className="space-y-6">
                    {React.createElement(currentGame.component, { onAnswer: handleAnswer })}
                  </div>
                )}

                {gamePhase === "results" && (
                  <div className="space-y-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-4xl font-bold mb-4">
                        {humanScore > aiScore ? "🎉 Victory!" : humanScore < aiScore ? "🤖 AI Won!" : "🤝 Draw!"}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-human-primary/20 rounded-lg">
                          <div className="text-2xl font-bold text-human-primary">{humanScore}</div>
                          <div className="text-sm text-muted-foreground">Your Score</div>
                        </div>
                        <div className="p-4 bg-ai-primary/20 rounded-lg">
                          <div className="text-2xl font-bold text-ai-primary">{aiScore}</div>
                          <div className="text-sm text-muted-foreground">AI Score</div>
                        </div>
                      </div>

                      {/* Skills gained */}
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 mb-6">
                        <h3 className="font-semibold mb-2 text-accent">Skills Improved!</h3>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          {Object.entries(skills).map(([skill, value]) => (
                            <div key={skill} className="capitalize">
                              {skill}: +{value}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          onClick={onBackToArena}
                          size="lg"
                          className="bg-primary text-primary-foreground hover:bg-primary-glow mr-3"
                        >
                          <Trophy className="mr-2 h-5 w-5" />
                          Back to Arena
                        </Button>
                        <Button
                          onClick={startGame}
                          size="lg"
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          Play Again
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Side */}
          <motion.div
            className="text-center"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-ai-primary/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <AIAvatar />
                </div>
                <CardTitle className="text-ai-primary">AI</CardTitle>
                <CardDescription>Your Challenger</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-ai-primary mb-2">{aiScore}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>

                {/* AI Status */}
                <div className="mt-6">
                  <Badge
                    variant={aiSpeaking ? "default" : "secondary"}
                    className={aiSpeaking ? "bg-ai-primary animate-pulse" : ""}
                  >
                    {aiSpeaking ? "Thinking..." : "Ready"}
                  </Badge>
                </div>

                {/* AI Explanation Box */}
                {gamePhase === "ai-turn" && (
                  <div className="mt-4 p-3 bg-ai-primary/20 rounded-lg border border-ai-primary/30">
                    <p className="text-sm text-muted-foreground italic">
                      "Let me analyze this pattern... I'm considering multiple factors..."
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};