import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skills, topCareers } = await req.json();

    const prompt = `Analyze this user's AI skills and provide personalized career insights:

User Skills:
${skills.map((skill: any) => `- ${skill.name}: Level ${skill.level} (${skill.xp} XP)`).join('\n')}

Top Career Matches:
${topCareers.map((career: any) => `- ${career.title}: ${career.matchPercentage}% match`).join('\n')}

Please provide 3-5 specific, actionable insights in this JSON format:
{
  "insights": [
    {
      "insight": "specific insight text",
      "type": "strength|improvement|opportunity",
      "priority": "high|medium|low"
    }
  ]
}

Focus on:
1. User's strongest skills and how they translate to career success
2. Specific skills to develop next for top career matches
3. Emerging opportunities in AI fields
4. Personalized learning recommendations`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an AI career advisor specializing in AI and technology careers. Provide specific, actionable insights based on user skill data.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const insights = JSON.parse(content);
      return new Response(JSON.stringify(insights), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return new Response(JSON.stringify({
        insights: [
          {
            insight: "Your AI skills show strong potential for technology careers. Focus on building practical experience through projects.",
            type: "strength",
            priority: "high"
          }
        ]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-career-insights function:', error);
    return new Response(JSON.stringify({ 
      error: (error as Error).message,
      insights: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});