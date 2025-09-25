import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Brain, Clock, CheckCircle, XCircle } from "lucide-react";

interface PuzzleDuelProps {
  onAnswer: (correct: boolean, responseTime: number, answer: string) => void;
}

const puzzles = [
  {
    id: 1,
    question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    answer: "fire",
    alternatives: ["flame", "blaze"],
    aiThinking: "Analyzing characteristics: grows but not alive, needs air but no lungs, dies in water... This describes combustion. Answer: Fire.",
    explanation: "Fire grows by consuming fuel, needs oxygen from air to sustain combustion, and water extinguishes it."
  },
  {
    id: 2,
    question: "What comes next in this sequence: 2, 6, 12, 20, 30, ?",
    answer: "42",
    alternatives: [],
    aiThinking: "Pattern analysis: 2=1×2, 6=2×3, 12=3×4, 20=4×5, 30=5×6... Next: 6×7=42",
    explanation: "Each number is n×(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, so next is 6×7=42."
  },
  {
    id: 3,
    question: "A man lives on the 20th floor. Every morning he takes the elevator down to ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest. Why? (One word answer)",
    answer: "short",
    alternatives: ["height", "reach"],
    aiThinking: "Classic puzzle: Person can't reach higher buttons. Physical limitation suggests... Answer: Short (can't reach the 20th floor button).",
    explanation: "He's too short to reach the 20th floor button, but can reach the 10th floor button."
  }
];

export const PuzzleDuel = ({ onAnswer }: PuzzleDuelProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [aiPhase, setAiPhase] = useState<"thinking" | "answer" | "done">("thinking");
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
    setUserAnswer("");
    setShowResult(false);
    setAiPhase("thinking");
    
    // AI thinking simulation
    const thinkingTimer = setTimeout(() => {
      setAiPhase("answer");
    }, 3000 + Math.random() * 2000);

    return () => clearTimeout(thinkingTimer);
  }, [currentPuzzle]);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const puzzle = puzzles[currentPuzzle];
    const responseTime = Date.now() - startTime;
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correct = normalizedAnswer === puzzle.answer || 
                   puzzle.alternatives.some(alt => alt === normalizedAnswer);
    
    setShowResult(true);
    setAiPhase("done");
    
    setTimeout(() => {
      onAnswer(correct, responseTime, userAnswer);
    }, 3000);
  };

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Puzzle className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Puzzle Duel</h2>
        </div>
        <p className="text-muted-foreground">
          Solve the puzzle faster than AI to win points!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Puzzle Question */}
        <motion.div
          key={currentPuzzle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-card to-muted/20 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Puzzle #{currentPuzzle + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-background rounded-lg border border-border mb-4">
                <p className="text-lg leading-relaxed">{puzzle.question}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Type your answer..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    disabled={showResult}
                    className="text-lg p-3"
                  />
                </div>
                
                <Button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim() || showResult}
                  className="w-full h-12 text-lg font-semibold"
                >
                  Submit Answer
                </Button>
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {userAnswer.toLowerCase().trim() === puzzle.answer || 
                     puzzle.alternatives.some(alt => alt === userAnswer.toLowerCase().trim()) ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <h3 className="font-semibold">
                      {userAnswer.toLowerCase().trim() === puzzle.answer || 
                       puzzle.alternatives.some(alt => alt === userAnswer.toLowerCase().trim()) ? 
                       "Correct!" : "Incorrect"}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Correct answer: {puzzle.answer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {puzzle.explanation}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-ai-primary/10 to-ai-secondary/10 border-2 border-ai-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-ai-primary">AI Opponent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                {aiPhase === "thinking" && (
                  <motion.div
                    className="space-y-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Brain className="h-12 w-12 text-ai-primary mx-auto" />
                    <Badge variant="outline" className="border-ai-primary text-ai-primary">
                      <Clock className="h-3 w-3 mr-1" />
                      Analyzing...
                    </Badge>
                    <div className="p-3 bg-ai-primary/10 rounded-lg text-sm italic">
                      "{puzzle.aiThinking}"
                    </div>
                  </motion.div>
                )}

                {aiPhase === "answer" && !showResult && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="space-y-4"
                  >
                    <CheckCircle className="h-12 w-12 text-ai-primary mx-auto" />
                    <Badge className="bg-ai-primary text-white">
                      AI Answer Ready!
                    </Badge>
                    <div className="p-3 bg-ai-primary/20 rounded-lg">
                      <p className="font-semibold">AI Answer: {puzzle.answer}</p>
                    </div>
                  </motion.div>
                )}

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="text-2xl font-bold text-ai-primary">
                      AI: {puzzle.answer}
                    </div>
                    <Badge variant="secondary">
                      Analysis Complete
                    </Badge>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};