import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useSkillMapping } from '@/hooks/useSkillMapping';
import { useCareerAdvisory, CareerPath, CareerInsight } from '@/hooks/useCareerAdvisory';
import { useVoiceNarration } from '@/hooks/useVoiceNarration';
import { SkillTree } from './skill-tree';
import { ExternalLink, Download, TrendingUp, Target, Lightbulb } from 'lucide-react';

export function CareerDashboard() {
  const { skills, loading: skillsLoading } = useSkillMapping();
  const { 
    careerPaths, 
    insights, 
    loading: careerLoading,
    generateCareerRecommendations,
    generateCareerReport 
  } = useCareerAdvisory();
  const { narrateCareerInsight, speaking } = useVoiceNarration();
  
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  useEffect(() => {
    if (skills.length > 0 && !careerLoading) {
      generateCareerRecommendations(skills);
    }
  }, [skills, careerLoading, generateCareerRecommendations]);

  const getInsightIcon = (type: CareerInsight['type']) => {
    switch (type) {
      case 'strength': return <TrendingUp className="w-4 h-4" />;
      case 'improvement': return <Target className="w-4 h-4" />;
      case 'opportunity': return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: CareerInsight['type']) => {
    switch (type) {
      case 'strength': return 'text-green-400';
      case 'improvement': return 'text-blue-400';
      case 'opportunity': return 'text-yellow-400';
    }
  };

  const handleInsightSpeak = (insight: string) => {
    narrateCareerInsight(insight);
  };

  const topSkills = skills.sort((a, b) => b.xp - a.xp).slice(0, 5);

  if (skillsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your AI Career Dashboard
        </motion.h1>
        <p className="text-muted-foreground">
          Personalized insights based on your game performance and skill development
        </p>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Skills
            </CardTitle>
            <CardDescription>Your strongest developed skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-muted-foreground">Level {skill.level}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{skill.xp} XP</Badge>
                  <Progress value={(skill.xp % 100)} className="w-20 mt-1" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3D Skill Tree</CardTitle>
            <CardDescription>Interactive visualization of your skill development</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillTree skills={skills} />
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Career Insights
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInsightSpeak(insights[0]?.insight || '')}
              disabled={!insights.length || speaking}
            >
              {speaking ? 'Speaking...' : '🔊 Listen'}
            </Button>
          </CardTitle>
          <CardDescription>Personalized recommendations based on your performance</CardDescription>
        </CardHeader>
        <CardContent>
          {careerLoading ? (
            <div className="text-center py-8">
              <div className="animate-pulse">Generating insights...</div>
            </div>
          ) : (
            <div className="grid gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={getInsightColor(insight.type)}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{insight.insight}</p>
                    <Badge 
                      variant={insight.priority === 'high' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {insight.priority} priority
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Career Pathways
            </span>
            <Button
              onClick={() => generateCareerReport(skills, careerPaths)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </CardTitle>
          <CardDescription>AI-matched career suggestions based on your skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {careerPaths.slice(0, 4).map((career, index) => (
              <motion.div
                key={career.id}
                className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCareer(selectedCareer?.id === career.id ? null : career)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{career.title}</h3>
                  <Badge 
                    variant={career.matchPercentage > 70 ? 'default' : 'secondary'}
                  >
                    {career.matchPercentage}% match
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{career.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400 font-medium">{career.averageSalary}</span>
                  <span className="text-blue-400">{career.growthProjection}</span>
                </div>

                {selectedCareer?.id === career.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 space-y-3 border-t pt-4"
                  >
                    <div>
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map(skill => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Skills to Develop:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.nextSkills.map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Learning Resources:</h4>
                      <div className="space-y-2">
                        {career.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {resource.title} ({resource.type})
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}