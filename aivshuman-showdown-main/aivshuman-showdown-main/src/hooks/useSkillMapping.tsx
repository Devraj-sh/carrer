import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Skill {
  id: string;
  name: string;
  category: string;
  xp: number;
  level: number;
  maxXp: number;
}

export interface GameSkillMapping {
  'spot-ai': ['Media Literacy', 'Critical Thinking'];
  'puzzle-duel': ['Logic', 'Problem-Solving'];
  'story-battle': ['Creativity', 'Communication'];
  'fact-check': ['Research', 'Critical Reasoning'];
  'teaching': ['Communication', 'Knowledge Depth'];
  'pattern': ['Analytical Thinking', 'Intro to ML'];
  'prompt-battle': ['Prompt Engineering', 'Creativity'];
  'case-simulation': ['Applied AI', 'Problem-Solving'];
  'coordination-lab': ['Multi-Tool Adaptability', 'Evaluation'];
  'ethical-scenarios': ['Ethical Decision-Making'];
}

export function useSkillMapping() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const skillCategories = {
    'Media Literacy': 'cognitive',
    'Critical Thinking': 'cognitive', 
    'Logic': 'analytical',
    'Problem-Solving': 'analytical',
    'Creativity': 'creative',
    'Communication': 'social',
    'Research': 'cognitive',
    'Critical Reasoning': 'cognitive',
    'Knowledge Depth': 'cognitive',
    'Analytical Thinking': 'analytical',
    'Intro to ML': 'technical',
    'Prompt Engineering': 'technical',
    'Applied AI': 'technical',
    'Multi-Tool Adaptability': 'technical',
    'Evaluation': 'analytical',
    'Ethical Decision-Making': 'social'
  };

  useEffect(() => {
    if (user) {
      loadUserSkills();
    }
  }, [user]);

  const loadUserSkills = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('skill_vector')
        .eq('user_id', user?.id)
        .single();

      const skillVector = profile?.skill_vector || {};
      
      const userSkills = Object.keys(skillCategories).map(skillName => ({
        id: skillName.toLowerCase().replace(/\s+/g, '-'),
        name: skillName,
        category: skillCategories[skillName as keyof typeof skillCategories],
        xp: skillVector[skillName] || 0,
        level: Math.floor((skillVector[skillName] || 0) / 100) + 1,
        maxXp: (Math.floor((skillVector[skillName] || 0) / 100) + 1) * 100
      }));

      setSkills(userSkills);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSkillXP = async (gameId: string, performance: 'win' | 'lose' | 'draw', score: number = 0) => {
    if (!user) return;

    const gameSkills = getSkillsForGame(gameId);
    const baseXP = performance === 'win' ? 25 : performance === 'draw' ? 15 : 10;
    const bonusXP = Math.floor(score / 10);
    const totalXP = baseXP + bonusXP;

    try {
      // Get current skill vector
      const { data: profile } = await supabase
        .from('profiles')
        .select('skill_vector')
        .eq('user_id', user.id)
        .single();

      const currentSkills = profile?.skill_vector || {};
      
      // Update skills
      gameSkills.forEach(skill => {
        currentSkills[skill] = (currentSkills[skill] || 0) + totalXP;
      });

      // Save to database
      await supabase
        .from('profiles')
        .update({ skill_vector: currentSkills })
        .eq('user_id', user.id);

      // Reload skills
      await loadUserSkills();

      return { skillsGained: gameSkills, xpGained: totalXP };
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  };

  const getSkillsForGame = (gameId: string): string[] => {
    const gameMapping: Record<string, string[]> = {
      'spot-ai': ['Media Literacy', 'Critical Thinking'],
      'puzzle-duel': ['Logic', 'Problem-Solving'],
      'story-battle': ['Creativity', 'Communication'],
      'fact-check': ['Research', 'Critical Reasoning'],
      'teaching': ['Communication', 'Knowledge Depth'],
      'pattern': ['Analytical Thinking', 'Intro to ML'],
      'prompt-battle': ['Prompt Engineering', 'Creativity'],
      'case-simulation': ['Applied AI', 'Problem-Solving'],
      'coordination-lab': ['Multi-Tool Adaptability', 'Evaluation'],
      'ethical-scenarios': ['Ethical Decision-Making']
    };

    return gameMapping[gameId] || [];
  };

  const getTopSkills = (limit: number = 5) => {
    return [...skills]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit);
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return {
    skills,
    loading,
    addSkillXP,
    getSkillsForGame,
    getTopSkills,
    getSkillsByCategory,
    reloadSkills: loadUserSkills
  };
}