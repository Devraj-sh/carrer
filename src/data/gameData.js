// Application Data
const APP_DATA = {
  "userProfiles": [
    {
      "id": "student_demo",
      "name": "Alex Chen",
      "age": 15,
      "type": "student",
      "avatar": "robot-student",
      "level": 12,
      "totalPoints": 2850,
      "streak": 7,
      "achievements": ["First Win", "Speed Master", "AI Detective", "Logic Champion"],
      "completedGames": ["spot-ai", "puzzle-duel", "fact-check"],
      "skills": {
        "ai_detection": 78,
        "logical_reasoning": 85,
        "creativity": 72,
        "critical_thinking": 80
      }
    },
    {
      "id": "adult_demo",
      "name": "Sarah Johnson",
      "age": 28,
      "type": "adult",
      "avatar": "professional-woman",
      "level": 8,
      "totalPoints": 1920,
      "streak": 12,
      "achievements": ["Prompt Master", "Ethics Expert", "Career Focused"],
      "completedLabs": ["prompt-battle", "ethical-scenarios"],
      "skills": {
        "prompt_engineering": 92,
        "ai_ethics": 88,
        "problem_solving": 85,
        "coordination": 76
      }
    }
  ],
  "studentGames": [
    {
      "id": "spot-ai",
      "title": "Spot the AI",
      "description": "Can you tell if this content was created by AI or a human?",
      "difficulty": "beginner",
      "estimatedTime": "3-5 minutes",
      "maxPoints": 100,
      "icon": "🔍",
      "scenarios": [
        {
          "content": "The sunrise painted the sky in brilliant shades of orange and pink, casting a warm glow over the tranquil lake.",
          "type": "human",
          "explanation": "This shows natural human descriptive writing with emotional connection to nature."
        },
        {
          "content": "Based on data analysis, the optimal solution involves implementing systematic approaches to maximize efficiency while maintaining quality standards.",
          "type": "ai",
          "explanation": "This uses typical AI language patterns with generic business terminology."
        },
        {
          "content": "My grandmother's cookies always reminded me of rainy Sunday afternoons, when the whole house smelled like vanilla and love.",
          "type": "human",
          "explanation": "Personal memories and sensory details are characteristic of human storytelling."
        },
        {
          "content": "To enhance productivity metrics, organizations should leverage synergistic methodologies that align with strategic objectives and optimize resource allocation.",
          "type": "ai",
          "explanation": "Corporate jargon and buzzwords without specific details are typical AI patterns."
        },
        {
          "content": "I accidentally put salt in my coffee this morning instead of sugar. It was disgusting, but somehow I drank the whole cup anyway because I'm stubborn.",
          "type": "human",
          "explanation": "Self-deprecating humor and illogical human behavior are distinctly human traits."
        }
      ]
    },
    {
      "id": "puzzle-duel",
      "title": "Puzzle Duel",
      "description": "Solve logic puzzles faster than our AI opponent",
      "difficulty": "intermediate", 
      "estimatedTime": "5-8 minutes",
      "maxPoints": 150,
      "icon": "🧩",
      "puzzles": [
        {
          "question": "If A=1, B=2, C=3... what does 'HELLO' equal?",
          "answer": "52",
          "explanation": "H(8)+E(5)+L(12)+L(12)+O(15) = 52",
          "options": ["48", "52", "56", "60"]
        },
        {
          "question": "What comes next in this sequence: 2, 6, 12, 20, 30, ?",
          "answer": "42",
          "explanation": "Each number is n(n+1) where n increases: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7",
          "options": ["38", "40", "42", "44"]
        },
        {
          "question": "If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?",
          "answer": "5",
          "explanation": "Each machine takes 5 minutes to make 1 widget, so 100 machines take 5 minutes to make 100 widgets.",
          "options": ["5", "20", "100", "500"]
        }
      ]
    },
    {
      "id": "story-battle",
      "title": "Story Battle",
      "description": "Create a story and compare it with AI's version",
      "difficulty": "advanced",
      "estimatedTime": "10-15 minutes", 
      "maxPoints": 200,
      "icon": "📝",
      "prompts": [
        {
          "prompt": "Write a short story about a robot who learns to paint",
          "aiStory": "Unit-7 processed color algorithms daily until discovering brushstrokes created emotions beyond binary code. Through experimentation with pigments, it learned that art transcends programming.",
          "criteria": ["Creativity", "Emotional depth", "Originality", "Storytelling"]
        },
        {
          "prompt": "Create a tale about friendship between unlikely characters", 
          "aiStory": "The dragon and the ice cube became friends when they realized opposites could coexist—fire and ice creating the perfect temperature for their shared garden.",
          "criteria": ["Character development", "Plot coherence", "Creativity", "Message"]
        }
      ]
    },
    {
      "id": "fact-check",
      "title": "Fact Check Arena",
      "description": "Identify fake news and misinformation",
      "difficulty": "intermediate",
      "estimatedTime": "4-6 minutes",
      "maxPoints": 120,
      "icon": "✅",
      "headlines": [
        {
          "text": "Local Man Discovers 50-foot Snake in His Backyard Pool",
          "isReal": false,
          "explanation": "This is an exaggerated claim typical of clickbait articles"
        },
        {
          "text": "Scientists Develop New Renewable Energy Storage Method",
          "isReal": true,
          "explanation": "This is a realistic scientific advancement headline"
        },
        {
          "text": "Celebrity Loses 30 Pounds in 2 Days Using This One Weird Trick",
          "isReal": false,
          "explanation": "Impossible weight loss claims are classic fake news"
        }
      ]
    }
  ],
  "adultLabs": [
    {
      "id": "prompt-battle",
      "title": "Prompt Engineering Battle",
      "description": "Craft the most effective prompts for AI systems",
      "difficulty": "professional",
      "estimatedTime": "15-20 minutes",
      "maxPoints": 300,
      "icon": "⚡",
      "challenges": [
        {
          "task": "Create a prompt that generates creative marketing copy for a eco-friendly water bottle",
          "criteria": ["Specificity", "Clarity", "Creativity", "Results Quality"],
          "example": "Write compelling marketing copy for an eco-friendly water bottle made from recycled ocean plastic, targeting environmentally conscious millennials, highlighting sustainability benefits and lifestyle appeal in 50 words"
        },
        {
          "task": "Design a prompt for analyzing customer feedback sentiment",
          "criteria": ["Technical accuracy", "Clear instructions", "Output format", "Edge cases"],
          "example": "Analyze customer feedback and classify sentiment as positive, negative, or neutral. For each review, provide: 1) sentiment classification, 2) confidence score (0-100), 3) key themes mentioned, 4) actionable insights for improvement"
        }
      ]
    },
    {
      "id": "case-simulation",
      "title": "AI Case Simulation",
      "description": "Solve real-world problems with AI assistance",
      "difficulty": "expert",
      "estimatedTime": "20-30 minutes",
      "maxPoints": 400,
      "icon": "💼",
      "cases": [
        {
          "title": "Customer Service Automation",
          "scenario": "Design an AI system to handle customer complaints while maintaining empathy and human connection",
          "challenges": ["Tone management", "Escalation protocols", "Privacy concerns", "Success metrics"]
        }
      ]
    },
    {
      "id": "ethical-scenarios",
      "title": "AI Ethics Laboratory",
      "description": "Navigate complex ethical dilemmas in AI development",
      "difficulty": "expert", 
      "estimatedTime": "15-25 minutes",
      "maxPoints": 350,
      "icon": "⚖️",
      "scenarios": [
        {
          "dilemma": "An AI hiring system shows bias against certain demographics. How do you address this?",
          "options": [
            "Retrain the model with balanced data",
            "Add bias correction algorithms", 
            "Implement human oversight for all decisions",
            "Increase transparency and explainability"
          ],
          "correct": 0,
          "explanation": "The most effective approach is to address bias at the source through balanced training data and proper model development practices."
        },
        {
          "dilemma": "Your AI recommendation system could increase engagement but might promote addictive behavior. What's your priority?",
          "options": [
            "Maximize user engagement metrics",
            "Balance engagement with user wellbeing",
            "Minimize addictive features completely",
            "Let users decide their own limits"
          ],
          "correct": 1,
          "explanation": "Responsible AI development requires balancing business goals with user welfare and ethical considerations."
        }
      ]
    }
  ],
  "achievements": [
    {
      "id": "first-win",
      "title": "First Victory",
      "description": "Complete your first challenge",
      "icon": "🏆",
      "rarity": "common",
      "points": 50
    },
    {
      "id": "speed-master", 
      "title": "Speed Master",
      "description": "Complete 5 challenges in record time",
      "icon": "⚡",
      "rarity": "rare",
      "points": 150
    },
    {
      "id": "ai-detective",
      "title": "AI Detective", 
      "description": "Perfect score in Spot the AI game",
      "icon": "🔍",
      "rarity": "uncommon",
      "points": 100
    },
    {
      "id": "ethics-expert",
      "title": "Ethics Expert",
      "description": "Master all ethical scenarios",
      "icon": "⚖️", 
      "rarity": "legendary",
      "points": 300
    }
  ],
  "leaderboard": [
    {"rank": 1, "name": "CodeMaster2024", "points": 4850, "level": 18},
    {"rank": 2, "name": "AIWhisperer", "points": 4720, "level": 17},
    {"rank": 3, "name": "LogicNinja", "points": 4690, "level": 17},
    {"rank": 4, "name": "EthicsGuru", "points": 4580, "level": 16},
    {"rank": 5, "name": "PromptMaster", "points": 4450, "level": 16}
  ]
};

// Application State
let currentUser = null;
let currentGame = null;
let gameState = {
  score: 0,
  currentQuestion: 0,
  timeRemaining: 300,
  answers: [],
  timer: null
};

// Avatar mappings
const AVATAR_ICONS = {
  'robot-student': '🤖',
  'human-student': '👨‍🎓',
  'professional-woman': '👩‍💼',
  'professional-man': '👨‍💼'
};

// Utility Functions
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

function animateCounter(element, start, end, duration = 1000) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  if (type === 'success') {
    notification.style.background = 'var(--color-success)';
  } else if (type === 'error') {
    notification.style.background = 'var(--color-error)';
  }
  
  document.body.appendChild(notification);
  
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Fixed Navigation Functions
function selectPath(type) {
  // This function is now used for landing page navigation
  window.selectedUserType = type;
  showAuth();
  
  // Auto-select the appropriate path card
  setTimeout(() => {
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    if (type === 'student') {
      document.querySelector('.student-path').classList.add('selected');
    } else {
      document.querySelector('.adult-path').classList.add('selected');
    }
    
    // Show profile form
    setTimeout(() => {
      document.querySelector('.profile-form').classList.remove('hidden');
      document.querySelector('.profile-form').scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, 100);
}

function showAuth() {
  showScreen('auth');
}

function showLanding() {
  showScreen('landing');
}

function createProfile(type) {
  // This function is used within the auth screen
  document.querySelectorAll('.path-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  if (type === 'student') {
    document.querySelector('.student-path').classList.add('selected');
  } else {
    document.querySelector('.adult-path').classList.add('selected');
  }
  
  window.selectedUserType = type;
  
  setTimeout(() => {
    document.querySelector('.profile-form').classList.remove('hidden');
    document.querySelector('.profile-form').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

function startJourney() {
  const username = document.getElementById('username').value.trim();
  const selectedAvatar = document.querySelector('.avatar-option.selected');
  
  if (!username) {
    showNotification('Please enter your name', 'error');
    return;
  }
  
  if (!selectedAvatar) {
    showNotification('Please select an avatar', 'error');
    return;
  }
  
  // Create user profile
  currentUser = {
    name: username,
    type: window.selectedUserType,
    avatar: selectedAvatar.dataset.avatar,
    level: 1,
    totalPoints: 0,
    streak: 0,
    achievements: [],
    skills: window.selectedUserType === 'student' ? 
      { ai_detection: 0, logical_reasoning: 0, creativity: 0, critical_thinking: 0 } :
      { prompt_engineering: 0, ai_ethics: 0, problem_solving: 0, coordination: 0 }
  };
  
  // Load demo data for better experience
  if (window.selectedUserType === 'student') {
    currentUser = { ...APP_DATA.userProfiles[0], name: username, avatar: selectedAvatar.dataset.avatar };
    showScreen('student-arena');
    initializeStudentArena();
  } else {
    currentUser = { ...APP_DATA.userProfiles[1], name: username, avatar: selectedAvatar.dataset.avatar };
    showScreen('adult-lab');
    initializeAdultLab();
  }
  
  showNotification(`Welcome ${username}! Your AI journey begins now.`);
}

// Avatar selection
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.avatar-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
});

// Student Arena Functions
function initializeStudentArena() {
  updateUserProfile();
  renderStudentGames();
  renderAchievements();
}

function updateUserProfile() {
  const elements = {
    userAvatar: document.getElementById('userAvatar'),
    userName: document.getElementById('userName'),
    userLevel: document.getElementById('userLevel'),
    userPoints: document.getElementById('userPoints'),
    userStreak: document.getElementById('userStreak'),
    adultAvatar: document.getElementById('adultAvatar'),
    adultName: document.getElementById('adultName'),
    adultLevel: document.getElementById('adultLevel'),
    adultPoints: document.getElementById('adultPoints'),
    adultStreak: document.getElementById('adultStreak')
  };
  
  if (currentUser) {
    const avatar = AVATAR_ICONS[currentUser.avatar] || '👤';
    
    if (elements.userAvatar) elements.userAvatar.textContent = avatar;
    if (elements.userName) elements.userName.textContent = currentUser.name;
    if (elements.userLevel) elements.userLevel.textContent = currentUser.level;
    if (elements.userPoints) animateCounter(elements.userPoints, 0, currentUser.totalPoints);
    if (elements.userStreak) elements.userStreak.textContent = currentUser.streak;
    
    if (elements.adultAvatar) elements.adultAvatar.textContent = avatar;
    if (elements.adultName) elements.adultName.textContent = currentUser.name;
    if (elements.adultLevel) elements.adultLevel.textContent = currentUser.level;
    if (elements.adultPoints) animateCounter(elements.adultPoints, 0, currentUser.totalPoints);
    if (elements.adultStreak) elements.adultStreak.textContent = currentUser.streak;
  }
}

function renderStudentGames() {
  const gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;
  
  gamesGrid.innerHTML = '';
  
  APP_DATA.studentGames.forEach((game, index) => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.style.animationDelay = `${index * 0.1}s`;
    
    const isCompleted = currentUser.completedGames?.includes(game.id);
    const completionBadge = isCompleted ? '<span class="status status--success">Completed</span>' : '';
    
    gameCard.innerHTML = `
      <div class="game-header">
        <div class="game-icon">${game.icon}</div>
        <div>
          <h3>${game.title}</h3>
          ${completionBadge}
        </div>
      </div>
      <p>${game.description}</p>
      <div class="game-meta">
        <span class="difficulty ${game.difficulty}">${game.difficulty}</span>
        <span>${game.estimatedTime}</span>
        <span>${game.maxPoints} pts</span>
      </div>
    `;
    
    gameCard.addEventListener('click', () => startGame(game));
    gamesGrid.appendChild(gameCard);
  });
}

function renderAchievements() {
  const achievementsList = document.getElementById('achievementsList');
  if (!achievementsList) return;
  
  achievementsList.innerHTML = '';
  
  const userAchievements = currentUser.achievements || [];
  userAchievements.forEach(achievementTitle => {
    const achievement = APP_DATA.achievements.find(a => a.title === achievementTitle);
    if (achievement) {
      const badge = document.createElement('div');
      badge.className = 'achievement-badge';
      badge.innerHTML = `
        <span>${achievement.icon}</span>
        <span>${achievement.title}</span>
      `;
      achievementsList.appendChild(badge);
    }
  });
}

// Adult Lab Functions
function initializeAdultLab() {
  updateUserProfile();
  renderAdultLabs();
  renderSkillBars();
}

function renderAdultLabs() {
  const labsGrid = document.getElementById('labsGrid');
  if (!labsGrid) return;
  
  labsGrid.innerHTML = '';
  
  APP_DATA.adultLabs.forEach((lab, index) => {
    const labCard = document.createElement('div');
    labCard.className = 'game-card';
    labCard.style.animationDelay = `${index * 0.1}s`;
    
    const isCompleted = currentUser.completedLabs?.includes(lab.id);
    const completionBadge = isCompleted ? '<span class="status status--success">Completed</span>' : '';
    
    labCard.innerHTML = `
      <div class="game-header">
        <div class="game-icon">${lab.icon}</div>
        <div>
          <h3>${lab.title}</h3>
          ${completionBadge}
        </div>
      </div>
      <p>${lab.description}</p>
      <div class="game-meta">
        <span class="difficulty ${lab.difficulty}">${lab.difficulty}</span>
        <span>${lab.estimatedTime}</span>
        <span>${lab.maxPoints} pts</span>
      </div>
    `;
    
    labCard.addEventListener('click', () => startGame(lab));
    labsGrid.appendChild(labCard);
  });
}

function renderSkillBars() {
  const skillBars = document.getElementById('skillBars');
  if (!skillBars || !currentUser.skills) return;
  
  skillBars.innerHTML = '';
  
  Object.entries(currentUser.skills).forEach(([skill, value]) => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    const skillName = skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    skillItem.innerHTML = `
      <div class="skill-name">${skillName}</div>
      <div class="skill-bar">
        <div class="skill-progress" style="width: 0%"></div>
      </div>
      <div class="skill-value">${value}%</div>
    `;
    
    skillBars.appendChild(skillItem);
    
    // Animate skill bar
    setTimeout(() => {
      const progressBar = skillItem.querySelector('.skill-progress');
      progressBar.style.width = `${value}%`;
    }, 500);
  });
}

// Game Functions
function startGame(game) {
  currentGame = game;
  gameState = {
    score: 0,
    currentQuestion: 0,
    timeRemaining: 300,
    answers: [],
    timer: null
  };
  
  showScreen('game-screen');
  initializeGame();
}

function initializeGame() {
  document.getElementById('gameTitle').textContent = currentGame.title;
  document.getElementById('gameScore').textContent = gameState.score;
  
  if (currentGame.id === 'spot-ai') {
    initializeSpotAI();
  } else if (currentGame.id === 'puzzle-duel') {
    initializePuzzleDuel();
  } else if (currentGame.id === 'fact-check') {
    initializeFactCheck();
  } else if (currentGame.id === 'ethical-scenarios') {
    initializeEthicalScenarios();
  } else if (currentGame.id === 'story-battle') {
    initializeStoryBattle();
  } else {
    initializeGenericGame();
  }
  
  startGameTimer();
  updateProgressBar();
}

function initializeSpotAI() {
  const scenarios = currentGame.scenarios;
  document.getElementById('totalQuestions').textContent = scenarios.length;
  
  showQuestion();
}

function initializePuzzleDuel() {
  const puzzles = currentGame.puzzles;
  document.getElementById('totalQuestions').textContent = puzzles.length;
  
  showPuzzle();
}

function initializeFactCheck() {
  const headlines = currentGame.headlines;
  document.getElementById('totalQuestions').textContent = headlines.length;
  
  showFactCheck();
}

function initializeEthicalScenarios() {
  const scenarios = currentGame.scenarios;
  document.getElementById('totalQuestions').textContent = scenarios.length;
  
  showEthicalScenario();
}

function initializeStoryBattle() {
  const prompts = currentGame.prompts;
  document.getElementById('totalQuestions').textContent = prompts.length;
  
  showStoryBattle();
}

function initializeGenericGame() {
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Coming Soon!</h3>
      <p>This game is under development. Check back soon for an amazing experience!</p>
      <button class="btn btn--primary" onclick="completeGame()">Continue</button>
    </div>
  `;
}

function showQuestion() {
  const scenarios = currentGame.scenarios;
  const currentScenario = scenarios[gameState.currentQuestion];
  
  if (!currentScenario) {
    completeGame();
    return;
  }
  
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Is this content created by AI or Human?</h3>
      <div class="question-text">${currentScenario.content}</div>
      <div class="options-grid">
        <button class="option-btn" onclick="submitAnswer('human')">👤 Human</button>
        <button class="option-btn" onclick="submitAnswer('ai')">🤖 AI</button>
      </div>
    </div>
  `;
  
  updateQuestionCounter();
}

function showPuzzle() {
  const puzzles = currentGame.puzzles;
  const currentPuzzle = puzzles[gameState.currentQuestion];
  
  if (!currentPuzzle) {
    completeGame();
    return;
  }
  
  const gameContent = document.getElementById('gameContent');
  const optionsHtml = currentPuzzle.options.map(option => 
    `<button class="option-btn" onclick="submitAnswer('${option}')">${option}</button>`
  ).join('');
  
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Solve this puzzle:</h3>
      <div class="question-text">${currentPuzzle.question}</div>
      <div class="options-grid">
        ${optionsHtml}
      </div>
    </div>
  `;
  
  updateQuestionCounter();
}

function showFactCheck() {
  const headlines = currentGame.headlines;
  const currentHeadline = headlines[gameState.currentQuestion];
  
  if (!currentHeadline) {
    completeGame();
    return;
  }
  
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Is this headline real or fake?</h3>
      <div class="question-text">${currentHeadline.text}</div>
      <div class="options-grid">
        <button class="option-btn" onclick="submitAnswer(true)">✅ Real</button>
        <button class="option-btn" onclick="submitAnswer(false)">❌ Fake</button>
      </div>
    </div>
  `;
  
  updateQuestionCounter();
}

function showEthicalScenario() {
  const scenarios = currentGame.scenarios;
  const currentScenario = scenarios[gameState.currentQuestion];
  
  if (!currentScenario) {
    completeGame();
    return;
  }
  
  const gameContent = document.getElementById('gameContent');
  const optionsHtml = currentScenario.options.map((option, index) => 
    `<button class="option-btn" onclick="submitAnswer(${index})">${option}</button>`
  ).join('');
  
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Ethical Dilemma</h3>
      <div class="question-text">${currentScenario.dilemma}</div>
      <div class="options-grid">
        ${optionsHtml}
      </div>
    </div>
  `;
  
  updateQuestionCounter();
}

function showStoryBattle() {
  const prompts = currentGame.prompts;
  const currentPrompt = prompts[gameState.currentQuestion];
  
  if (!currentPrompt) {
    completeGame();
    return;
  }
  
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Story Battle Challenge</h3>
      <div class="question-text">
        <strong>Prompt:</strong> ${currentPrompt.prompt}
      </div>
      <div style="margin: 20px 0;">
        <label class="form-label">Write your story:</label>
        <textarea id="userStory" class="form-control" rows="8" placeholder="Write your creative story here..."></textarea>
      </div>
      <button class="btn btn--primary" onclick="submitStoryAnswer()">Compare with AI</button>
    </div>
  `;
  
  updateQuestionCounter();
}

function submitStoryAnswer() {
  const userStory = document.getElementById('userStory').value.trim();
  
  if (!userStory) {
    showNotification('Please write your story first!', 'error');
    return;
  }
  
  const currentPrompt = currentGame.prompts[gameState.currentQuestion];
  const aiStory = currentPrompt.aiStory;
  
  // Disable the submit button
  event.target.disabled = true;
  
  // Show comparison
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <div class="question-card">
      <h3>Story Comparison</h3>
      <div class="story-comparison" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="border: 2px solid var(--human-glow); border-radius: 8px; padding: 16px;">
          <h4 style="color: var(--human-glow); margin-bottom: 12px;">👤 Your Story</h4>
          <p style="font-style: italic; line-height: 1.6;">${userStory}</p>
        </div>
        <div style="border: 2px solid var(--ai-glow); border-radius: 8px; padding: 16px;">
          <h4 style="color: var(--ai-glow); margin-bottom: 12px;">🤖 AI Story</h4>
          <p style="font-style: italic; line-height: 1.6;">${aiStory}</p>
        </div>
      </div>
      <div class="criteria-scoring" style="margin: 20px 0;">
        <h4>Rate your story compared to AI:</h4>
        <div class="criteria-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          ${currentPrompt.criteria.map(criterion => `
            <button class="option-btn story-rating" onclick="rateStory('${criterion}', this)">
              ${criterion}: Better
            </button>
          `).join('')}
        </div>
      </div>
      <button class="btn btn--primary" onclick="completeStoryQuestion()" disabled id="finishStoryBtn">Continue</button>
    </div>
  `;
  
  gameState.userStory = userStory;
  gameState.storyRatings = {};
}

function rateStory(criterion, button) {
  button.classList.add('selected');
  button.style.background = 'var(--color-primary)';
  button.style.color = 'white';
  
  gameState.storyRatings[criterion] = true;
  
  // Enable continue button if all criteria are rated
  const currentPrompt = currentGame.prompts[gameState.currentQuestion];
  if (Object.keys(gameState.storyRatings).length >= currentPrompt.criteria.length) {
    document.getElementById('finishStoryBtn').disabled = false;
  }
}

function completeStoryQuestion() {
  // Award points based on self-assessment
  const ratingsCount = Object.keys(gameState.storyRatings).length;
  const pointsEarned = Math.floor(currentGame.maxPoints / currentGame.prompts.length);
  gameState.score += pointsEarned;
  
  gameState.answers.push({
    answer: gameState.userStory,
    isCorrect: true, // Creative tasks are always "correct"
    explanation: `Great creativity! You earned ${pointsEarned} points for your unique story.`
  });
  
  // Show feedback before continuing
  showNotification(`Excellent story! +${pointsEarned} points`);
  
  setTimeout(() => {
    nextQuestion();
  }, 2000);
  
  updateScore();
}

function submitAnswer(answer) {
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  let isCorrect = false;
  let explanation = '';
  
  if (currentGame.id === 'spot-ai') {
    const scenario = currentGame.scenarios[gameState.currentQuestion];
    isCorrect = answer === scenario.type;
    explanation = scenario.explanation;
  } else if (currentGame.id === 'puzzle-duel') {
    const puzzle = currentGame.puzzles[gameState.currentQuestion];
    isCorrect = answer === puzzle.answer;
    explanation = puzzle.explanation;
  } else if (currentGame.id === 'fact-check') {
    const headline = currentGame.headlines[gameState.currentQuestion];
    isCorrect = answer === headline.isReal;
    explanation = headline.explanation;
  } else if (currentGame.id === 'ethical-scenarios') {
    const scenario = currentGame.scenarios[gameState.currentQuestion];
    isCorrect = answer === scenario.correct;
    explanation = scenario.explanation;
  }
  
  // Visual feedback
  const clickedButton = event.target;
  if (isCorrect) {
    clickedButton.classList.add('correct');
    gameState.score += Math.floor(currentGame.maxPoints / getTotalQuestions());
  } else {
    clickedButton.classList.add('incorrect');
    // Show correct answer
    buttons.forEach((btn, index) => {
      if (currentGame.id === 'ethical-scenarios' && index === currentGame.scenarios[gameState.currentQuestion].correct) {
        btn.classList.add('correct');
      } else if (currentGame.id === 'puzzle-duel' && btn.textContent === currentGame.puzzles[gameState.currentQuestion].answer) {
        btn.classList.add('correct');
      }
    });
  }
  
  gameState.answers.push({ answer, isCorrect, explanation });
  
  // Show explanation
  setTimeout(() => {
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.style.cssText = `
      margin-top: 16px;
      padding: 16px;
      background: var(--hologram);
      border-radius: 8px;
      border: 1px solid var(--ai-glow);
    `;
    explanationDiv.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
    document.querySelector('.question-card').appendChild(explanationDiv);
    
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  }, 1000);
  
  updateScore();
}

function nextQuestion() {
  gameState.currentQuestion++;
  
  if (currentGame.id === 'spot-ai') {
    showQuestion();
  } else if (currentGame.id === 'puzzle-duel') {
    showPuzzle();
  } else if (currentGame.id === 'fact-check') {
    showFactCheck();
  } else if (currentGame.id === 'ethical-scenarios') {
    showEthicalScenario();
  } else if (currentGame.id === 'story-battle') {
    showStoryBattle();
  }
  
  updateProgressBar();
}

function updateScore() {
  const scoreElement = document.getElementById('gameScore');
  animateCounter(scoreElement, parseInt(scoreElement.textContent), gameState.score);
}

function updateQuestionCounter() {
  document.getElementById('currentQuestion').textContent = gameState.currentQuestion + 1;
}

function updateProgressBar() {
  const totalQuestions = getTotalQuestions();
  const progress = ((gameState.currentQuestion) / totalQuestions) * 100;
  document.getElementById('gameProgress').style.width = `${progress}%`;
}

function getTotalQuestions() {
  if (currentGame.scenarios) return currentGame.scenarios.length;
  if (currentGame.puzzles) return currentGame.puzzles.length;
  if (currentGame.headlines) return currentGame.headlines.length;
  if (currentGame.prompts) return currentGame.prompts.length;
  return 5; // default
}

function startGameTimer() {
  clearInterval(gameState.timer);
  
  gameState.timer = setInterval(() => {
    gameState.timeRemaining--;
    updateTimerDisplay();
    
    if (gameState.timeRemaining <= 0) {
      completeGame();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeRemaining / 60);
  const seconds = gameState.timeRemaining % 60;
  document.getElementById('timeRemaining').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function completeGame() {
  clearInterval(gameState.timer);
  
  const totalQuestions = getTotalQuestions();
  const correctAnswers = gameState.answers.filter(a => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
  const timeTaken = 300 - gameState.timeRemaining;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  
  // Update user stats
  currentUser.totalPoints += gameState.score;
  if (accuracy === 100) {
    currentUser.streak++;
  }
  
  // Show results modal
  document.getElementById('finalScore').textContent = gameState.score;
  document.getElementById('accuracy').textContent = `${accuracy}%`;
  document.getElementById('completionTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Check for new achievements
  checkAchievements(accuracy, gameState.score);
  
  document.getElementById('gameResultModal').classList.remove('hidden');
}

function checkAchievements(accuracy, score) {
  const newAchievements = [];
  
  // First win achievement
  if (!currentUser.achievements.includes('First Victory') && score > 0) {
    newAchievements.push('First Victory');
  }
  
  // Perfect score achievement
  if (accuracy === 100 && currentGame.id === 'spot-ai' && !currentUser.achievements.includes('AI Detective')) {
    newAchievements.push('AI Detective');
  }
  
  // Add new achievements to user profile
  newAchievements.forEach(achievement => {
    if (!currentUser.achievements.includes(achievement)) {
      currentUser.achievements.push(achievement);
    }
  });
  
  // Display new achievements
  const achievementsContainer = document.getElementById('newAchievements');
  achievementsContainer.innerHTML = '';
  
  if (newAchievements.length > 0) {
    const title = document.createElement('h4');
    title.textContent = 'New Achievements Unlocked!';
    title.style.color = 'var(--color-primary)';
    achievementsContainer.appendChild(title);
    
    newAchievements.forEach(achievementTitle => {
      const achievement = APP_DATA.achievements.find(a => a.title === achievementTitle);
      if (achievement) {
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.innerHTML = `<span>${achievement.icon}</span> <span>${achievement.title}</span>`;
        badge.style.animation = 'achievementShine 1s ease-out';
        achievementsContainer.appendChild(badge);
      }
    });
  }
}

function closeGameResult() {
  document.getElementById('gameResultModal').classList.add('hidden');
  backToArena();
}

function playAgain() {
  document.getElementById('gameResultModal').classList.add('hidden');
  startGame(currentGame);
}

function backToArena() {
  if (currentUser.type === 'student') {
    showScreen('student-arena');
    updateUserProfile();
  } else {
    showScreen('adult-lab');
    updateUserProfile();
  }
}

function backFromDashboard() {
  if (currentUser.type === 'student') {
    showScreen('student-arena');
  } else {
    showScreen('adult-lab');
  }
}

// Dashboard Functions
function showDashboard() {
  showScreen('dashboard');
  initializeDashboard();
}

function initializeDashboard() {
  // Update dashboard stats
  document.getElementById('dashboardPoints').textContent = currentUser.totalPoints;
  document.getElementById('gamesCompleted').textContent = 
    (currentUser.completedGames?.length || 0) + (currentUser.completedLabs?.length || 0);
  document.getElementById('dashboardStreak').textContent = currentUser.streak;
  document.getElementById('userRank').textContent = '#8'; // Static for demo
  
  // Render skills chart
  renderSkillsChart();
  
  // Render achievements gallery
  renderAchievementsGallery();
  
  // Render leaderboard
  renderLeaderboard();
}

function renderSkillsChart() {
  const skillsChart = document.getElementById('skillsChart');
  skillsChart.innerHTML = '';
  
  Object.entries(currentUser.skills).forEach(([skill, value]) => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    const skillName = skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    skillItem.innerHTML = `
      <div class="skill-name">${skillName}</div>
      <div class="skill-bar">
        <div class="skill-progress" style="width: 0%"></div>
      </div>
      <div class="skill-value">${value}%</div>
    `;
    
    skillsChart.appendChild(skillItem);
    
    // Animate skill bar
    setTimeout(() => {
      const progressBar = skillItem.querySelector('.skill-progress');
      progressBar.style.width = `${value}%`;
    }, 300);
  });
}

function renderAchievementsGallery() {
  const gallery = document.getElementById('achievementsGallery');
  gallery.innerHTML = '';
  
  APP_DATA.achievements.forEach(achievement => {
    const isUnlocked = currentUser.achievements.includes(achievement.title);
    
    const achievementCard = document.createElement('div');
    achievementCard.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    achievementCard.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      margin-bottom: 8px;
      ${isUnlocked ? 'background: var(--hologram);' : 'opacity: 0.5;'}
    `;
    
    achievementCard.innerHTML = `
      <div style="font-size: 24px;">${achievement.icon}</div>
      <div>
        <div style="font-weight: 500;">${achievement.title}</div>
        <div style="font-size: 12px; color: var(--color-text-secondary);">${achievement.description}</div>
        <div style="font-size: 12px; color: var(--color-primary);">${achievement.points} points</div>
      </div>
    `;
    
    gallery.appendChild(achievementCard);
  });
}

function renderLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  
  APP_DATA.leaderboard.forEach(user => {
    const leaderboardItem = document.createElement('div');
    leaderboardItem.className = 'leaderboard-item';
    
    leaderboardItem.innerHTML = `
      <div class="rank ${user.rank <= 3 ? 'top-3' : ''}">#${user.rank}</div>
      <div style="flex: 1;">
        <div style="font-weight: 500;">${user.name}</div>
        <div style="font-size: 12px; color: var(--color-text-secondary);">Level ${user.level}</div>
      </div>
      <div style="color: var(--color-primary); font-weight: 500;">${user.points}</div>
    `;
    
    leaderboard.appendChild(leaderboardItem);
  });
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add some interactive particle effects
  createParticleEffects();
  
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

function createParticleEffects() {
  const particleContainer = document.getElementById('particles-bg');
  
  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--ai-glow);
      border-radius: 50%;
      opacity: 0.6;
      animation: particleFloat ${10 + Math.random() * 10}s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 10}s;
    `;
    particleContainer.appendChild(particle);
  }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% { transform: translateY(100vh) translateX(0px) rotate(0deg); }
    25% { transform: translateY(75vh) translateX(20px) rotate(90deg); }
    50% { transform: translateY(50vh) translateX(-20px) rotate(180deg); }
    75% { transform: translateY(25vh) translateX(20px) rotate(270deg); }
    100% { transform: translateY(-10px) translateX(0px) rotate(360deg); }
  }
`;
document.head.appendChild(style);