import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GameAnswer {
  questionId: number;
  userAnswer: string;
  correct: boolean;
  responseTime: number;
  aiExplanation?: string;
}

interface SkillMapping {
  creativity?: number;
  logic?: number;
  communication?: number;
  critical?: number;
  technical?: number;
  collaboration?: number;
}

export const useGameSession = (gameId: string, userType: "student" | "adult") => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<GameAnswer[]>([]);
  const [skills, setSkills] = useState<SkillMapping>({
    creativity: 0,
    logic: 0,
    communication: 0,
    critical: 0,
    technical: 0,
    collaboration: 0
  });

  const startSession = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("game_sessions")
        .insert({
          game_id: gameId,
          user_id: user.id,
          session_data: { userType, gameId } as any,
          responses: [] as any,
          skill_improvements: {} as any
        })
        .select()
        .single();

      if (error) throw error;
      
      setSessionId(data.id);
      return data.id;
    } catch (error) {
      console.error("Error starting game session:", error);
      return null;
    }
  }, [gameId, userType]);

  const recordAnswer = useCallback(async (answer: GameAnswer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Calculate skill improvements based on game and answer
    const skillUpdate = calculateSkillImprovement(gameId, answer);
    const newSkills = {
      ...skills,
      ...Object.keys(skillUpdate).reduce((acc, key) => {
        const currentValue = (skills as any)[key] || 0;
        const updateValue = (skillUpdate as any)[key] || 0;
        (acc as any)[key] = currentValue + updateValue;
        return acc;
      }, {} as SkillMapping)
    };
    setSkills(newSkills);

    // Update session in database
    if (sessionId) {
      try {
        const { error } = await supabase
          .from("game_sessions")
          .update({
            responses: newAnswers as any,
            skill_improvements: newSkills as any,
            score: newAnswers.filter(a => a.correct).length
          })
          .eq("id", sessionId);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating game session:", error);
      }
    }

    return skillUpdate;
  }, [sessionId, answers, skills, gameId]);

  const endSession = useCallback(async () => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from("game_sessions")
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq("id", sessionId);

      if (error) throw error;

      // Update user's skill vector in profiles
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            skill_vector: skills as any
          })
          .eq("user_id", user.id);

        if (profileError) console.error("Error updating profile skills:", profileError);
      }
    } catch (error) {
      console.error("Error ending game session:", error);
    }
  }, [sessionId, skills]);

  return {
    sessionId,
    answers,
    skills,
    startSession,
    recordAnswer,
    endSession
  };
};

// Helper function to calculate skill improvements based on game performance
function calculateSkillImprovement(gameId: string, answer: GameAnswer): Partial<SkillMapping> {
  const baseImprovement = answer.correct ? 5 : 2; // More points for correct answers
  const timeBonus = answer.responseTime < 10000 ? 2 : 0; // Bonus for quick thinking

  switch (gameId) {
    case "spot-ai":
      return {
        critical: baseImprovement + timeBonus,
        technical: baseImprovement / 2
      };
    case "puzzle-duel":
      return {
        logic: baseImprovement + timeBonus,
        critical: baseImprovement / 2
      };
    case "story-battle":
      return {
        creativity: baseImprovement + timeBonus,
        communication: baseImprovement / 2
      };
    case "fact-check":
      return {
        critical: baseImprovement + timeBonus,
        logic: baseImprovement / 2
      };
    case "teach-ai":
      return {
        communication: baseImprovement + timeBonus,
        collaboration: baseImprovement / 2
      };
    case "pattern-guess":
      return {
        logic: baseImprovement + timeBonus,
        technical: baseImprovement / 2
      };
    default:
      return {
        logic: baseImprovement
      };
  }
}