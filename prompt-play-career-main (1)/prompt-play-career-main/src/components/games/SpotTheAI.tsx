import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Zap, CheckCircle, XCircle } from "lucide-react";

interface SpotTheAIProps {
  onAnswer: (correct: boolean, responseTime: number, answer: string) => void;
}

const gameData = [
  {
    id: 1,
    content: "The sunset painted the sky in brilliant hues of orange and pink, casting a warm glow over the tranquil lake.",
    correctAnswer: "human",
    explanation: "This has natural, flowing language with specific sensory details typical of human writing."
  },
  {
    id: 2,
    content: "As an AI language model, I can tell you that sunsets occur when the Earth rotates away from the sun, creating various color spectrums in the atmosphere.",
    correctAnswer: "ai",
    explanation: "The phrase 'As an AI language model' is a dead giveaway, plus the technical explanation style is typical of AI responses."
  },
  {
    id: 3,
    content: "OMG this pizza is literally the best thing ever!!! 🍕 Can't even handle how good it is rn",
    correctAnswer: "human",
    explanation: "The informal language, typos, excessive punctuation, and emoji usage indicates human casual writing."
  },
  {
    id: 4,
    content: "Pizza is a popular Italian dish consisting of a yeasted flatbread typically topped with tomato sauce and cheese and baked in an oven.",
    correctAnswer: "ai",
    explanation: "This is a very formal, encyclopedia-style definition that AI systems commonly produce."
  },
  {
    id: 5,
    content: "Had the weirdest dream last night where I was flying through clouds made of cotton candy. Woke up craving sugar lol",
    correctAnswer: "human",
    explanation: "Personal experiences, dreams, and casual expressions like 'lol' are distinctly human characteristics."
  }
];

export const SpotTheAI = ({ onAnswer }: SpotTheAIProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const responseTime = Date.now() - startTime;
    const correct = answer === gameData[currentQuestion].correctAnswer;
    
    setTimeout(() => {
      onAnswer(correct, responseTime, answer);
    }, 2000);
  };

  const question = gameData[currentQuestion];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Eye className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Spot the AI</h2>
        </div>
        <p className="text-muted-foreground">
          Read the content below. Was it written by a human or AI?
        </p>
      </motion.div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-card to-muted/20 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Content Sample #{currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-background rounded-lg border border-border mb-6">
              <p className="text-lg leading-relaxed">{question.content}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleAnswer("human")}
                disabled={selectedAnswer !== null}
                variant={selectedAnswer === "human" ? 
                  (question.correctAnswer === "human" ? "default" : "destructive") : 
                  "outline"
                }
                className={`h-16 text-lg font-semibold transition-all duration-300 ${
                  selectedAnswer === null ? "hover:scale-105 hover:shadow-lg" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {showResult && selectedAnswer === "human" && (
                    question.correctAnswer === "human" ? 
                    <CheckCircle className="h-5 w-5" /> : 
                    <XCircle className="h-5 w-5" />
                  )}
                  👤 Human Written
                </div>
              </Button>

              <Button
                onClick={() => handleAnswer("ai")}
                disabled={selectedAnswer !== null}
                variant={selectedAnswer === "ai" ? 
                  (question.correctAnswer === "ai" ? "default" : "destructive") : 
                  "outline"
                }
                className={`h-16 text-lg font-semibold transition-all duration-300 ${
                  selectedAnswer === null ? "hover:scale-105 hover:shadow-lg" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {showResult && selectedAnswer === "ai" && (
                    question.correctAnswer === "ai" ? 
                    <CheckCircle className="h-5 w-5" /> : 
                    <XCircle className="h-5 w-5" />
                  )}
                  🤖 AI Generated
                </div>
              </Button>
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">AI Explanation:</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
                <div className="mt-3">
                  <Badge variant={selectedAnswer === question.correctAnswer ? "default" : "destructive"}>
                    {selectedAnswer === question.correctAnswer ? "Correct! ✓" : "Incorrect ✗"}
                  </Badge>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};