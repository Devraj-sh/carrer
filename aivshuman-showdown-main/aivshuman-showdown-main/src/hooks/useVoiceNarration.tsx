import { useState, useRef } from 'react';

export interface VoiceSettings {
  enabled: boolean;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

export function useVoiceNarration() {
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 0.8
  });
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize voices
  useState(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set default voice (prefer English voices)
      const defaultVoice = availableVoices.find(v => 
        v.lang.startsWith('en') && v.name.includes('Google')
      ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
      
      if (defaultVoice) {
        setSettings(prev => ({ ...prev, voice: defaultVoice }));
      }
    };

    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }
  });

  const speak = (text: string, options?: { priority?: 'high' | 'medium' | 'low' }) => {
    if (!settings.enabled || !text.trim()) return;

    // Stop current speech if high priority
    if (options?.priority === 'high' && speaking) {
      stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = settings.voice;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const pause = () => {
    if (speaking) {
      speechSynthesis.pause();
    }
  };

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  };

  // Predefined narration messages
  const narrateSkillGain = (skillName: string, xp: number) => {
    speak(`🎓 Excellent! You earned ${xp} experience points in ${skillName}. Keep building your skills!`, { priority: 'medium' });
  };

  const narrateGameStart = (gameName: string, skills: string[]) => {
    speak(`🎮 Starting ${gameName}! This game will help you develop your ${skills.join(' and ')} skills. Good luck!`, { priority: 'high' });
  };

  const narrateGameEnd = (result: 'win' | 'lose' | 'draw', score?: number) => {
    const messages = {
      win: `🎉 Congratulations! You won! ${score ? `Your score: ${score} points.` : ''}`,
      lose: `💪 Good effort! Every challenge makes you stronger. Try again!`,
      draw: `🤝 Great match! You're evenly matched with the AI.`
    };
    speak(messages[result], { priority: 'high' });
  };

  const narrateCareerInsight = (insight: string) => {
    speak(`💡 Career insight: ${insight}`, { priority: 'medium' });
  };

  const narrateLevelUp = (skillName: string, newLevel: number) => {
    speak(`🚀 Level up! You've reached level ${newLevel} in ${skillName}! Amazing progress!`, { priority: 'high' });
  };

  return {
    settings,
    setSettings,
    speaking,
    voices,
    speak,
    stop,
    pause,
    resume,
    // Predefined narration functions
    narrateSkillGain,
    narrateGameStart,
    narrateGameEnd,
    narrateCareerInsight,
    narrateLevelUp
  };
}