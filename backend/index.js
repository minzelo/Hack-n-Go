const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// === Import routes ===
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const learningRoutes = require('./routes/learningRoutes'); // ✅ Untuk modul belajar

// === Middleware ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve HTML files specifically
app.use('/html', express.static(path.join(__dirname, '../frontend/html')));

// === API Routing ===
app.use('/api/quiz', quizRoutes);          // endpoint quiz
app.use('/user', userRoutes);              // endpoint user
app.use('/api/modules', learningRoutes);   // endpoint modul belajar

// === Specific HTML Routes ===
app.get('/sign-in.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/sign-in.html'));
});

app.get('/sign-up.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/sign-up.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/home.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/profile.html'));
});

app.get('/test-profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../test-profile.html'));
});

// === Root route redirect ===
app.get('/', (req, res) => {
  res.redirect('/html/sign-in.html');
});

// === Helper functions ===
function getUsers() {
  try {
    const dataPath = path.join(__dirname, 'data', 'users.json');
    console.log('Reading users from:', dataPath);
    const data = fs.readFileSync(dataPath, 'utf-8');
    const users = JSON.parse(data);
    console.log(`Loaded ${users.length} users from database`);
    return users;
  } catch (error) {
    console.error('Error reading users.json:', error);
    return [];
  }
}

function saveUsers(users) {
  try {
    const dataPath = path.join(__dirname, 'data', 'users.json');
    console.log('Saving users to:', dataPath);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    console.log(`Successfully saved ${users.length} users to database`);
  } catch (error) {
    console.error('Error saving users.json:', error);
    throw error;
  }
}

// === Email validation helper ===
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// === Password validation helper ===
function isValidPassword(password) {
  // At least 8 characters, 1 capital letter, 1 number, 1 symbol
  const minLength = password.length >= 8;
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  return {
    isValid: minLength && hasCapital && hasNumber && hasSymbol,
    requirements: {
      minLength,
      hasCapital,
      hasNumber,
      hasSymbol
    }
  };
}

// === Login Route ===
app.post('/login', async (req, res) => {
  try {
    console.log('Login attempt received:', { email: req.body.email, timestamp: req.body.timestamp });
    
  const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required.' 
      });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      console.log('Login failed: Invalid email format');
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address.' 
      });
    }
    
    // Load users from database
  const users = getUsers();
    console.log('Available users:', users.map(u => ({ email: u.email, username: u.username })));
    
    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Email not found. Please check your email or sign up for a new account.' 
      });
    }

    console.log('User found:', { username: user.username, email: user.email });

    // Verify password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Login failed: Incorrect password for user:', user.email);
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password. Please try again.' 
      });
    }

    console.log('Login successful for user:', user.email);

    // Return user data (excluding password) on successful login
    const userData = { ...user };
    delete userData.password;
    
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful!', 
      user: userData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// === Register Route ===
app.post('/register', async (req, res) => {
  try {
    console.log('Registration attempt received:', { 
      username: req.body.username, 
      email: req.body.email, 
      timestamp: req.body.timestamp 
    });
    
  const { username, email, password, confirmPassword } = req.body;

    // Input validation
  if (!username || !email || !password || !confirmPassword) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
    }

    // Username validation
    if (username.trim().length < 3) {
      console.log('Registration failed: Username too short');
      return res.status(400).json({ 
        success: false, 
        message: 'Username must be at least 3 characters long.' 
      });
    }

    // Email validation
    if (!isValidEmail(email)) {
      console.log('Registration failed: Invalid email format');
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address.' 
      });
    }

    // Password validation
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.isValid) {
      console.log('Registration failed: Password does not meet requirements');
      const missing = [];
      if (!passwordValidation.requirements.minLength) missing.push('at least 8 characters');
      if (!passwordValidation.requirements.hasCapital) missing.push('1 capital letter');
      if (!passwordValidation.requirements.hasNumber) missing.push('1 number');
      if (!passwordValidation.requirements.hasSymbol) missing.push('1 symbol');
      
      return res.status(400).json({ 
        success: false, 
        message: `Password must have: ${missing.join(', ')}.` 
      });
    }

    // Password confirmation
  if (password !== confirmPassword) {
      console.log('Registration failed: Password confirmation mismatch');
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match.' 
      });
  }

    // Load existing users
  const users = getUsers();
    
    // Check if email already exists
    const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      console.log('Registration failed: Email already exists:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered. Please use a different email or sign in.' 
      });
    }

    // Check if username already exists
    const usernameExists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (usernameExists) {
      console.log('Registration failed: Username already exists:', username);
      return res.status(400).json({ 
        success: false, 
        message: 'Username already taken. Please choose a different username.' 
      });
  }

    // Hash password
    console.log('Hashing password for new user...');
  const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
  const newUser = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
    password: hashedPassword,
    xp: 0,
    streak: 0,
    completedLessons: [],
    completedQuizzes: [],
      achievements: [],
      createdAt: new Date().toISOString()
  };

    // Add user to database
  users.push(newUser);
  saveUsers(users);

    console.log('Registration successful for user:', newUser.email);

    return res.status(201).json({ 
      success: true, 
      message: 'Registration successful! Please sign in with your new account.',
      user: {
        username: newUser.username,
        email: newUser.email,
        xp: newUser.xp,
        streak: newUser.streak
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// === Test endpoint to check users ===
app.get('/api/users/test', (req, res) => {
  try {
    const users = getUsers();
    const userList = users.map(u => ({
      username: u.username,
      email: u.email,
      xp: u.xp,
      streak: u.streak,
      createdAt: u.createdAt || 'Unknown'
    }));
    
    res.json({
      success: true,
      totalUsers: users.length,
      users: userList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error loading users',
      error: error.message
    });
  }
});

// === Update user stats endpoint ===
app.post('/api/users/update-stats', async (req, res) => {
  try {
    console.log('Stats update request received:', req.body);
    
    const { email, xpEarned, quizCompleted } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required.' 
      });
    }

    // Load existing users
    const users = getUsers();
    
    // Find user by email
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) {
      console.log('Stats update failed: User not found:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    // Update user stats
    const user = users[userIndex];
    
    if (xpEarned && typeof xpEarned === 'number') {
      user.xp = (user.xp || 0) + xpEarned;
      console.log(`Added ${xpEarned} XP to user ${email}. New total: ${user.xp}`);
    }
    
    if (quizCompleted) {
      user.quizzesTaken = (user.quizzesTaken || 0) + 1;
      console.log(`Quiz completed by user ${email}. Total quizzes: ${user.quizzesTaken}`);
    }

    // Update last activity
    user.lastActivity = new Date().toISOString();

    // Save updated users
    users[userIndex] = user;
    saveUsers(users);

    console.log('Stats updated successfully for user:', email);

    return res.status(200).json({ 
      success: true, 
      message: 'Stats updated successfully!',
      user: {
        username: user.username,
        email: user.email,
        xp: user.xp,
        quizzesTaken: user.quizzesTaken,
        streak: user.streak
      }
    });
  } catch (error) {
    console.error('Stats update error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// === Get user progress for modules ===
app.get('/api/users/:username/progress', (req, res) => {
    try {
        const username = req.params.username;
        const users = getUsers();
        const user = users.find(u => u.username === username);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Initialize moduleProgress if it doesn't exist
        if (!user.moduleProgress) {
            user.moduleProgress = {
                owasp: {
                    completedLessons: [],
                    totalLessons: 10,
                    progressPercentage: 0
                },
                iso27001: {
                    completedLessons: [],
                    totalLessons: 4,
                    progressPercentage: 0
                }
            };
            saveUsers(users);
        }
        
        res.json({ moduleProgress: user.moduleProgress });
    } catch (error) {
        console.error('Error getting user progress:', error);
        res.status(500).json({ error: 'Failed to get user progress' });
    }
});

// === Update module progress ===
app.post('/api/users/:username/progress', (req, res) => {
    try {
        const username = req.params.username;
        const { module, lessonId } = req.body;
        const users = getUsers();
        const userIndex = users.findIndex(u => u.username === username);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const user = users[userIndex];
        
        // Initialize moduleProgress if it doesn't exist
        if (!user.moduleProgress) {
            user.moduleProgress = {
                owasp: {
                    completedLessons: [],
                    totalLessons: 10,
                    progressPercentage: 0
                },
                iso27001: {
                    completedLessons: [],
                    totalLessons: 4,
                    progressPercentage: 0
                }
            };
        }
        
        // Add lesson to completed if not already completed
        if (!user.moduleProgress[module].completedLessons.includes(lessonId)) {
            user.moduleProgress[module].completedLessons.push(lessonId);
            
            // Update progress percentage
            const totalLessons = user.moduleProgress[module].totalLessons;
            const completedCount = user.moduleProgress[module].completedLessons.length;
            user.moduleProgress[module].progressPercentage = Math.round((completedCount / totalLessons) * 100);
            
            // Add XP for completing lesson
            user.xp += 50;
            
            saveUsers(users);
            
            res.json({ 
                message: 'Progress updated successfully',
                moduleProgress: user.moduleProgress,
                xp: user.xp
            });
        } else {
            res.json({ 
                message: 'Lesson already completed',
                moduleProgress: user.moduleProgress,
                xp: user.xp
            });
        }
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// === Start Server ===
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Test users endpoint: http://localhost:${port}/api/users/test`);
  
  // Test database connection on startup
  try {
    const users = getUsers();
    console.log(`✅ Database connected successfully. Found ${users.length} users.`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}); 