// Application data
const appData = {
  courses: [
    {
      id: 1,
      title: "गणित (Mathematics)",
      description: "Basic to Advanced Mathematics for Classes 6-12",
      duration: "6 months",
      level: "Beginner to Advanced",
      subjects: ["Algebra", "Geometry", "Trigonometry", "Statistics"]
    },
    {
      id: 2,
      title: "विज्ञान (Science)",
      description: "Physics, Chemistry, Biology fundamentals",
      duration: "8 months",
      level: "Intermediate",
      subjects: ["Physics", "Chemistry", "Biology", "Environmental Science"]
    },
    {
      id: 3,
      title: "हिंदी साहित्य (Hindi Literature)",
      description: "Hindi language and literature studies",
      duration: "4 months",
      level: "All Levels",
      subjects: ["Grammar", "Poetry", "Prose", "Composition"]
    },
    {
      id: 4,
      title: "English Language",
      description: "English communication and comprehension",
      duration: "6 months",
      level: "Beginner to Intermediate",
      subjects: ["Speaking", "Reading", "Writing", "Grammar"]
    },
    {
      id: 5,
      title: "कंप्यूटर विज्ञान (Computer Science)",
      description: "Basic computer skills and programming",
      duration: "5 months",
      level: "Beginner",
      subjects: ["Basic Computing", "Internet Skills", "Programming Basics", "Digital Tools"]
    },
    {
      id: 6,
      title: "व्यावसायिक कौशल (Vocational Skills)",
      description: "Practical skills for employment",
      duration: "3 months",
      level: "All Levels",
      subjects: ["Agriculture Tech", "Basic Electronics", "Tailoring", "Small Business"]
    }
  ],
  motivationalContent: {
    dailyQuotes: [
      {
        english: "Education is the most powerful weapon which you can use to change the world.",
        hindi: "शिक्षा सबसे शक्तिशाली हथियार है जिससे आप दुनिया बदल सकते हैं।",
        author: "Nelson Mandela"
      },
      {
        english: "The future belongs to those who believe in the beauty of their dreams.",
        hindi: "भविष्य उनका है जो अपने सपनों की सुंदरता में विश्वास करते हैं।",
        author: "Eleanor Roosevelt"
      },
      {
        english: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        hindi: "सफलता अंतिम नहीं है, असफलता घातक नहीं है: आगे बढ़ते रहने का साहस ही मायने रखता है।",
        author: "Winston Churchill"
      }
    ],
    successStories: [
      {
        name: "रामेश कुमार (Ramesh Kumar)",
        story: "A farmer's son from a small village near Nabha who became a software engineer at a top IT company through dedication and online learning.",
        achievement: "Software Engineer at Tech Company"
      },
      {
        name: "प्रिया शर्मा (Priya Sharma)",
        story: "Overcame financial challenges to become the first doctor in her family, now serves rural communities.",
        achievement: "Medical Doctor serving Rural Areas"
      },
      {
        name: "अमित सिंह (Amit Singh)",
        story: "Used digital learning platforms to master English and is now an international business consultant.",
        achievement: "International Business Consultant"
      }
    ],
    videoLectures: [
      {
        title: "सपनों को हकीकत बनाओ (Make Your Dreams Reality)",
        description: "Learn how to turn your biggest dreams into achievable goals",
        duration: "15 minutes",
        speaker: "Dr. Motivational Singh"
      },
      {
        title: "गांव से ग्लोबल - आपका सफर (From Village to Global - Your Journey)",
        description: "Stories of rural students who made it big on the world stage",
        duration: "20 minutes",
        speaker: "Inspirational Kaur"
      },
      {
        title: "शिक्षा की शक्ति (Power of Education)",
        description: "Understanding how education can transform your life and community",
        duration: "18 minutes",
        speaker: "Prof. Knowledge Patel"
      },
      {
        title: "मुश्किल राह, आसान मंजिल (Difficult Path, Easy Destination)",
        description: "Overcoming challenges in your educational journey",
        duration: "22 minutes",
        speaker: "Champion Gupta"
      }
    ]
  },
  subjects: [
    "Mathematics",
    "Science",
    "Hindi",
    "English",
    "Computer Science",
    "Social Studies",
    "Arts",
    "Vocational Training"
  ]
};

// Application state
let currentQuoteIndex = 0;
let attendanceData = [];

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing application...');
  
  // Load attendance data from localStorage
  const storedData = localStorage.getItem('attendanceData');
  if (storedData) {
    try {
      attendanceData = JSON.parse(storedData);
    } catch (e) {
      console.warn('Error parsing attendance data:', e);
      attendanceData = [];
    }
  }
  
  // Initialize all components
  initializeNavigation();
  loadDailyQuote();
  loadFeaturedCourses();
  loadAllCourses();
  loadMotivationalContent();
  loadSubjects();
  updateAttendanceStats();
  initializeAttendanceForm();
  
  console.log('Application initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
  console.log('Initializing navigation...');
  
  const navItems = document.querySelectorAll('.nav-item');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const heroCta = document.querySelector('.hero-cta');

  // Navigation menu items
  navItems.forEach((item, index) => {
    console.log(`Adding click handler for nav item ${index}:`, item.getAttribute('data-section'));
    
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      console.log('Navigation clicked:', sectionId);
      
      showSection(sectionId);
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const currentDisplay = window.getComputedStyle(nav).display;
      nav.style.display = currentDisplay === 'none' ? 'flex' : 'none';
    });
  }

  // Hero CTA button
  if (heroCta) {
    heroCta.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Hero CTA clicked, navigating to courses');
      showSection('courses');
      navItems.forEach(nav => nav.classList.remove('active'));
      const coursesNav = document.querySelector('[data-section="courses"]');
      if (coursesNav) {
        coursesNav.classList.add('active');
      }
    });
  }
}

function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  const sections = document.querySelectorAll('.section');
  
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.classList.add('fade-in');
    
    console.log('Section displayed:', sectionId);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Remove animation class after animation completes
    setTimeout(() => {
      targetSection.classList.remove('fade-in');
    }, 500);
  } else {
    console.error('Section not found:', sectionId);
  }
}

// Load daily quote
function loadDailyQuote() {
  const quoteElement = document.getElementById('dailyQuote');
  if (!quoteElement) return;

  const today = new Date().getDate();
  const quoteIndex = today % appData.motivationalContent.dailyQuotes.length;
  const quote = appData.motivationalContent.dailyQuotes[quoteIndex];

  quoteElement.innerHTML = `
    <p class="quote-text">"${quote.english}"</p>
    <p class="quote-text-hindi">"${quote.hindi}"</p>
    <cite class="quote-author">- ${quote.author}</cite>
  `;
}

// Load featured courses (first 3)
function loadFeaturedCourses() {
  const grid = document.getElementById('featuredCoursesGrid');
  if (!grid) return;

  const featuredCourses = appData.courses.slice(0, 3);
  grid.innerHTML = featuredCourses.map(course => createCourseCard(course)).join('');
}

// Load all courses
function loadAllCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  grid.innerHTML = appData.courses.map(course => createCourseCard(course)).join('');
}

// Create course card HTML
function createCourseCard(course) {
  return `
    <div class="course-card" onclick="viewCourseDetails(${course.id})">
      <div class="course-card-header">
        <h3 class="course-title">${course.title}</h3>
      </div>
      <div class="course-card-body">
        <p class="course-description">${course.description}</p>
        <div class="course-meta">
          <span class="course-duration">📅 ${course.duration}</span>
          <span class="course-level">📊 ${course.level}</span>
        </div>
        <div class="course-subjects">
          ${course.subjects.map(subject => 
            `<span class="subject-tag">${subject}</span>`
          ).join('')}
        </div>
      </div>
    </div>
  `;
}

function viewCourseDetails(courseId) {
  const course = appData.courses.find(c => c.id === courseId);
  if (course) {
    alert(`कोर्स: ${course.title}\n\nविवरण: ${course.description}\n\nअवधि: ${course.duration}\nस्तर: ${course.level}\n\nविषय: ${course.subjects.join(', ')}\n\nजल्द ही इस कोर्स की विस्तृत जानकारी उपलब्ध होगी।\n\nCourse: ${course.title}\nDetails coming soon!`);
  }
}

// Load motivational content
function loadMotivationalContent() {
  loadMotivationalQuote();
  loadVideoLectures();
  loadSuccessStories();
  
  // Setup new quote button
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadMotivationalQuote();
    });
  }
}

function loadMotivationalQuote() {
  const quoteContainer = document.getElementById('motivationalQuote');
  if (!quoteContainer) return;

  const quote = appData.motivationalContent.dailyQuotes[currentQuoteIndex];
  
  quoteContainer.innerHTML = `
    <blockquote class="quote">
      <p class="quote-text">"${quote.english}"</p>
      <p class="quote-text-hindi">"${quote.hindi}"</p>
      <cite class="quote-author">- ${quote.author}</cite>
    </blockquote>
  `;

  currentQuoteIndex = (currentQuoteIndex + 1) % appData.motivationalContent.dailyQuotes.length;
}

function loadVideoLectures() {
  const videoGrid = document.getElementById('videoGrid');
  if (!videoGrid) return;

  videoGrid.innerHTML = appData.motivationalContent.videoLectures.map((video, index) => `
    <div class="video-card" onclick="playVideo(${index})">
      <div class="video-thumbnail">
        🎬
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <p class="video-description">${video.description}</p>
        <div class="video-meta">
          <span>⏱️ ${video.duration}</span>
          <span>👨‍🏫 ${video.speaker}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function playVideo(videoIndex) {
  const video = appData.motivationalContent.videoLectures[videoIndex];
  alert(`प्रेरणादायक वीडियो: ${video.title}\n\nवक्ता: ${video.speaker}\nअवधि: ${video.duration}\n\n${video.description}\n\nजल्द ही यह वीडियो उपलब्ध होगा।\n\nMotivational Video: ${video.title}\nComing Soon!`);
}

function loadSuccessStories() {
  const storiesGrid = document.getElementById('storiesGrid');
  if (!storiesGrid) return;

  storiesGrid.innerHTML = appData.motivationalContent.successStories.map(story => `
    <div class="story-card">
      <h3 class="story-name">${story.name}</h3>
      <p class="story-text">${story.story}</p>
      <div class="story-achievement">${story.achievement}</div>
    </div>
  `).join('');
}

// Load subjects for attendance form
function loadSubjects() {
  const subjectSelect = document.getElementById('subjectSelect');
  if (!subjectSelect) return;

  subjectSelect.innerHTML = '<option value="">Select Subject</option>' +
    appData.subjects.map(subject => 
      `<option value="${subject}">${subject}</option>`
    ).join('');
}

// Initialize attendance form
function initializeAttendanceForm() {
  const form = document.getElementById('attendanceForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    markAttendance();
  });
}

function markAttendance() {
  const name = document.getElementById('studentName').value.trim();
  const studentClass = document.getElementById('studentClass').value;
  const subject = document.getElementById('subjectSelect').value;

  if (!name || !studentClass || !subject) {
    alert('कृपया सभी फील्ड भरें / Please fill all fields');
    return;
  }

  // Create attendance record
  const now = new Date();
  const attendanceRecord = {
    id: Date.now(),
    name: name,
    class: studentClass,
    subject: subject,
    date: now.toLocaleDateString('hi-IN'),
    time: now.toLocaleTimeString('hi-IN'),
    timestamp: now.getTime()
  };

  // Save to localStorage
  attendanceData.push(attendanceRecord);
  try {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }

  // Show attendance summary
  showAttendanceSummary(attendanceRecord);
  
  // Update stats
  updateAttendanceStats();
  
  // Clear form
  document.getElementById('attendanceForm').reset();
  
  console.log('Attendance marked:', attendanceRecord);
}

function showAttendanceSummary(record) {
  const summarySection = document.getElementById('attendanceSummary');
  const attendeeInfo = document.getElementById('attendeeInfo');
  const attendanceTime = document.getElementById('attendanceTime');

  if (summarySection && attendeeInfo && attendanceTime) {
    attendeeInfo.textContent = `${record.name} (Class ${record.class}) - ${record.subject}`;
    attendanceTime.textContent = `${record.date} ${record.time}`;
    summarySection.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      summarySection.style.display = 'none';
    }, 5000);
  }
}

function updateAttendanceStats() {
  const totalDaysElement = document.getElementById('totalDays');
  const presentDaysElement = document.getElementById('presentDays');
  const percentageElement = document.getElementById('attendancePercentage');

  if (!totalDaysElement || !presentDaysElement || !percentageElement) return;

  // Calculate unique days student was present
  const uniqueDates = [...new Set(attendanceData.map(record => record.date))];
  const presentDays = uniqueDates.length;
  
  // Calculate total days since first attendance (minimum 1)
  const totalDays = Math.max(presentDays, 1);
  
  // Calculate percentage
  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  totalDaysElement.textContent = totalDays;
  presentDaysElement.textContent = presentDays;
  percentageElement.textContent = `${percentage}%`;
}

// Handle responsive navigation
function handleResponsiveNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  if (window.innerWidth <= 768) {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
  }
}

// Add resize event listener
window.addEventListener('resize', handleResponsiveNav);

// Add smooth scrolling for better user experience
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add click handler to logo for scroll to top
setTimeout(() => {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollToTop();
    });
    logo.style.cursor = 'pointer';
  }
}, 1000);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const nav = document.querySelector('.nav');
    // Close mobile menu if open
    if (nav && window.innerWidth <= 768 && nav.style.display === 'flex') {
      nav.style.display = 'none';
    }
  }
});

// Performance optimization: Lazy load animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const contentObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Initialize animations after content loads
setTimeout(() => {
  const cards = document.querySelectorAll('.card, .course-card, .video-card, .story-card, .feature-card');
  cards.forEach(card => {
    if (contentObserver && typeof contentObserver.observe === 'function') {
      contentObserver.observe(card);
    }
  });
}, 2000);

// Tab switching
document.getElementById('showSignUp').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('showLogin').classList.remove('active');
    document.getElementById('studentSignUpForm').style.display = '';
    document.getElementById('studentLoginForm').style.display = 'none';
    document.getElementById('loginStatus').innerHTML = '';
});
document.getElementById('showLogin').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('showSignUp').classList.remove('active');
    document.getElementById('studentSignUpForm').style.display = 'none';
    document.getElementById('studentLoginForm').style.display = '';
    document.getElementById('loginStatus').innerHTML = '';
});

// Sign Up
document.getElementById('studentSignUpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const studentClass = document.getElementById('signupClass').value;
    const password = document.getElementById('signupPassword').value;
    const statusDiv = document.getElementById('loginStatus');
    statusDiv.innerHTML = '<span class="loading"></span>';
    try {
        const response = await fetch('http://localhost:3001/api/student-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, class: studentClass, password })
        });
        const result = await response.json();
        if (result.success) {
            statusDiv.innerHTML = '<span class="status status--success">Registration successful!</span>';
        } else {
            statusDiv.innerHTML = `<span class="status status--error">${result.message || 'Registration failed.'}</span>`;
        }
    } catch (err) {
        statusDiv.innerHTML = '<span class="status status--error">Server error.</span>';
    }
});

// Login
document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('loginName').value;
    const studentClass = document.getElementById('loginClass').value;
    const password = document.getElementById('loginPassword').value;
    const statusDiv = document.getElementById('loginStatus');
    statusDiv.innerHTML = '<span class="loading"></span>';
    try {
        const response = await fetch('http://localhost:3001/api/student-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, class: studentClass, password })
        });
        const result = await response.json();
        if (result.success) {
            statusDiv.innerHTML = '<span class="status status--success">Login successful!</span>';
        } else {
            statusDiv.innerHTML = `<span class="status status--error">${result.message || 'Login failed.'}</span>`;
        }
    } catch (err) {
        statusDiv.innerHTML = '<span class="status status--error">Server error.</span>';
    }
});

console.log('App.js loaded successfully');