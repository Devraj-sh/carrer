import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Skill } from './useSkillMapping';

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  averageSalary: string;
  growthProjection: string;
  matchPercentage: number;
  nextSkills: string[];
  resources: {
    title: string;
    url: string;
    type: 'course' | 'article' | 'tool' | 'certification';
  }[];
}

export interface CareerInsight {
  insight: string;
  type: 'strength' | 'improvement' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
}

export function useCareerAdvisory() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<CareerInsight[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);

  const careerDatabase: Record<string, CareerPath> = {
    'ai-engineer': {
      id: 'ai-engineer',
      title: 'AI/ML Engineer',
      description: 'Design and develop AI systems, machine learning models, and intelligent applications.',
      requiredSkills: ['Logic', 'Problem-Solving', 'Analytical Thinking', 'Intro to ML', 'Applied AI'],
      averageSalary: '$120k - $200k',
      growthProjection: '+40% by 2030',
      matchPercentage: 0,
      nextSkills: ['Deep Learning', 'Python Programming', 'Statistics', 'Computer Vision'],
      resources: [
        { title: 'Machine Learning Course', url: 'https://coursera.org/ml', type: 'course' },
        { title: 'TensorFlow Certification', url: 'https://tensorflow.org/certificate', type: 'certification' }
      ]
    },
    'content-creator': {
      id: 'content-creator',
      title: 'AI Content Creator',
      description: 'Create engaging content using AI tools, focusing on education and entertainment.',
      requiredSkills: ['Creativity', 'Communication', 'Media Literacy', 'Prompt Engineering'],
      averageSalary: '$50k - $150k',
      growthProjection: '+30% by 2030',
      matchPercentage: 0,
      nextSkills: ['Video Production', 'Social Media Marketing', 'Brand Strategy'],
      resources: [
        { title: 'Content Strategy Guide', url: 'https://example.com/content', type: 'article' },
        { title: 'AI Content Tools', url: 'https://example.com/tools', type: 'tool' }
      ]
    },
    'ai-ethicist': {
      id: 'ai-ethicist',
      title: 'AI Ethics Specialist',
      description: 'Ensure responsible AI development and deployment, addressing bias and ethical concerns.',
      requiredSkills: ['Ethical Decision-Making', 'Critical Thinking', 'Communication', 'Research'],
      averageSalary: '$90k - $160k',
      growthProjection: '+50% by 2030',
      matchPercentage: 0,
      nextSkills: ['Policy Analysis', 'Legal Knowledge', 'Philosophy', 'Risk Assessment'],
      resources: [
        { title: 'AI Ethics Certificate', url: 'https://example.com/ethics', type: 'certification' },
        { title: 'Ethics in AI Research', url: 'https://example.com/research', type: 'article' }
      ]
    },
    'data-scientist': {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Analyze complex data to extract insights and drive business decisions.',
      requiredSkills: ['Analytical Thinking', 'Logic', 'Research', 'Problem-Solving'],
      averageSalary: '$100k - $180k',
      growthProjection: '+35% by 2030',
      matchPercentage: 0,
      nextSkills: ['Statistics', 'R/Python', 'Data Visualization', 'SQL'],
      resources: [
        { title: 'Data Science Bootcamp', url: 'https://example.com/ds', type: 'course' },
        { title: 'Tableau Certification', url: 'https://example.com/tableau', type: 'certification' }
      ]
    }
  };

  const generateCareerRecommendations = async (skills: Skill[]) => {
    setLoading(true);
    
    try {
      // Calculate match percentages for each career
      const recommendations = Object.values(careerDatabase).map(career => {
        const userSkillNames = skills.map(s => s.name);
        const matchingSkills = career.requiredSkills.filter(skill => 
          userSkillNames.includes(skill)
        );
        const matchPercentage = (matchingSkills.length / career.requiredSkills.length) * 100;
        
        return {
          ...career,
          matchPercentage: Math.round(matchPercentage)
        };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);

      setCareerPaths(recommendations);

      // Generate AI insights
      const topSkills = skills.sort((a, b) => b.xp - a.xp).slice(0, 5);
      await generateAIInsights(topSkills, recommendations);

    } catch (error) {
      console.error('Error generating career recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIInsights = async (topSkills: Skill[], careers: CareerPath[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-career-insights', {
        body: {
          skills: topSkills.map(s => ({ name: s.name, xp: s.xp, level: s.level })),
          topCareers: careers.slice(0, 3)
        }
      });

      if (error) throw error;

      const generatedInsights: CareerInsight[] = [
        {
          insight: `Your strongest skill is ${topSkills[0]?.name} with ${topSkills[0]?.xp} XP. This makes you well-suited for ${careers[0]?.title} roles.`,
          type: 'strength',
          priority: 'high'
        },
        {
          insight: `Consider developing ${careers[0]?.nextSkills?.[0]} to increase your match for ${careers[0]?.title} positions.`,
          type: 'improvement',
          priority: 'medium'
        },
        {
          insight: `The ${careers[1]?.title} field is growing by ${careers[1]?.growthProjection}. Your current skills show ${careers[1]?.matchPercentage}% alignment.`,
          type: 'opportunity',
          priority: 'medium'
        }
      ];

      if (data?.insights) {
        generatedInsights.push(...data.insights);
      }

      setInsights(generatedInsights);
    } catch (error) {
      console.error('Error generating AI insights:', error);
      // Fallback to static insights if AI fails
      setInsights([
        {
          insight: `Your strongest skill area shows great potential for AI-related careers.`,
          type: 'strength',
          priority: 'high'
        }
      ]);
    }
  };

  const generateCareerReport = async (skills: Skill[], careers: CareerPath[]) => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      skills: skills.map(s => ({
        name: s.name,
        level: s.level,
        xp: s.xp,
        category: s.category
      })),
      topCareers: careers.slice(0, 3),
      insights: insights,
      recommendations: careers[0]?.nextSkills || []
    };

    // In a real app, this would generate a PDF
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-career-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    loading,
    insights,
    careerPaths,
    generateCareerRecommendations,
    generateCareerReport
  };
}