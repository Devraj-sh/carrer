import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SkillRadar3D } from "@/components/3d/SkillRadar3D";
import { supabase } from "@/integrations/supabase/client";
import { 
  Brain, 
  Lightbulb, 
  MessageSquare, 
  Search, 
  Code2, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Target,
  BookOpen,
  Trophy
} from "lucide-react";

interface SkillDashboardProps {
  userType: "student" | "adult";
  onBackToHome: () => void;
}

export const SkillDashboard = ({ userType, onBackToHome }: SkillDashboardProps) => {
  const [skills, setSkills] = useState([
    { name: "Creativity", value: 0, icon: Lightbulb, color: "#ff1493", description: "Creative thinking and innovation" },
    { name: "Logic", value: 0, icon: Brain, color: "#00bfff", description: "Logical reasoning and problem solving" },
    { name: "Communication", value: 0, icon: MessageSquare, color: "#ffa500", description: "Clear communication and explanation" },
    { name: "Critical Thinking", value: 0, icon: Search, color: "#ff0000", description: "Analysis and evaluation skills" },
    { name: "Technical", value: 0, icon: Code2, color: "#00ffff", description: "Technical and digital literacy" },
    { name: "Collaboration", value: 0, icon: Users, color: "#9932cc", description: "Teamwork and cooperation" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("skill_vector")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (profile?.skill_vector) {
          const skillVector = profile.skill_vector as any;
          setSkills(prev => prev.map(skill => ({
            ...skill,
            value: Math.min(skillVector[skill.name.toLowerCase().replace(" ", "")] || 0, 100)
          })));
        }
      } catch (error) {
        console.error("Error fetching user skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, []);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillsData = {
    creativity: { value: 85, trend: "+12%", icon: <Lightbulb className="h-5 w-5" />, color: "skill-creativity" },
    logic: { value: 72, trend: "+8%", icon: <Brain className="h-5 w-5" />, color: "skill-logic" },
    communication: { value: 90, trend: "+15%", icon: <MessageSquare className="h-5 w-5" />, color: "skill-communication" },
    critical: { value: 78, trend: "+5%", icon: <Search className="h-5 w-5" />, color: "skill-critical" },
    technical: { value: 65, trend: "+20%", icon: <Code2 className="h-5 w-5" />, color: "skill-technical" },
    collaboration: { value: 88, trend: "+10%", icon: <Users className="h-5 w-5" />, color: "skill-collaboration" },
  };

  const recommendations = [
    {
      skill: "Technical Skills",
      action: "Complete 3 more Prompt Engineering challenges",
      impact: "+15 points expected",
      timeframe: "2 weeks",
    },
    {
      skill: "Critical Thinking",
      action: "Play Fact Check Arena daily",
      impact: "+12 points expected", 
      timeframe: "1 week",
    },
    {
      skill: "Communication",
      action: "Join collaborative AI projects",
      impact: "+8 points expected",
      timeframe: "3 weeks",
    },
  ];

  const careerPaths = [
    {
      title: "AI Product Manager",
      match: "92%",
      skills: ["Communication", "Critical Thinking", "Collaboration"],
      growth: "High Demand",
    },
    {
      title: "UX/AI Designer", 
      match: "88%",
      skills: ["Creativity", "Technical", "Communication"],
      growth: "Emerging Field",
    },
    {
      title: "Data Scientist",
      match: "75%",
      skills: ["Technical", "Logic", "Critical Thinking"],
      growth: "Established",
    },
  ];

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
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            onClick={onBackToHome}
            className="mb-4 border-primary text-primary hover:bg-primary hover:text-background"
          >
            ← Back to Home
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
            Skill Mapping Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your AI literacy journey and discover career opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 h-full">
              <CardHeader>
                <CardTitle className="text-center gradient-text">3D Skill Radar</CardTitle>
                <CardDescription className="text-center">
                  Your skill development visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {!loading && (
                  <SkillRadar3D
                    skills={skills.map(skill => ({
                      skill: skill.name,
                      value: skill.value,
                      color: skill.color
                    }))}
                    className="w-full h-full"
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills List */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Skill Vector
                </CardTitle>
                <CardDescription>
                  Real-time assessment based on gameplay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className={`skill-node cursor-pointer p-3 rounded-lg border-2 transition-all duration-300 ${
                        selectedSkill === skill.name 
                          ? "border-primary bg-primary/10" 
                          : "border-border/50 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                          <div className="font-medium">{skill.name}</div>
                        </div>
                        <div className="text-xl font-bold">{skill.value}%</div>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                      {selectedSkill === skill.name && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {skill.description}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};