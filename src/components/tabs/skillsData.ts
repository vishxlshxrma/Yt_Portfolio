/**
 * Skill Cosmos Data Model
 * 
 * A multi-layer graph-based data structure representing skills across domains,
 * subclusters, and individual technologies with cross-domain relationships.
 */

// ============================================================================
// TYPES
// ============================================================================

export type SkillType = "language" | "framework" | "library" | "database" | "tool" | "concept" | "platform";
export type SkillImportance = "core" | "strong" | "familiar" | "learning";

export type DomainId = 
  | "intelligent-systems" 
  | "application-engineering" 
  | "backend-distributed" 
  | "data-storage" 
  | "infrastructure-devops" 
  | "languages-foundations";

export interface Domain {
  id: DomainId;
  name: string;
  shortName: string;
  color: string;
  accent: string;
  description: string;
  whyItMatters: string;
  subclusterIds: string[];
  featuredProjectIds: string[];
  highlightedSkillIds: string[];
}

export interface Subcluster {
  id: string;
  name: string;
  domainId: DomainId;
  description: string;
  skillIds: string[];
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  importance: SkillImportance;
  description: string;
  domainIds: DomainId[];
  subclusterIds: string[];
  relatedProjectIds: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  skillIds: string[];
  domainIds?: DomainId[];
  skillKeywords?: string[];
}

// ============================================================================
// PROJECTS DATA
// ============================================================================

export const projects: Project[] = [
  {
    id: "transizr",
    name: "Transizr",
    description: "AI-powered media transcription platform using distributed workers and real-time job tracking.",
    domainIds: ["application-engineering", "backend-distributed", "data-storage", "infrastructure-devops", "languages-foundations"],
    skillIds: ["fastapi", "celery", "rabbitmq", "redis", "docker", "python", "distributed-systems", "event-driven", "rest-apis", "postgresql"],
    skillKeywords: ["Full Stack Development", "Application Engineering", "Backend & Distributed Systems", "Distributed Systems", "Event-Driven Systems", "Microservices", "System Design", "Scalability", "API Design", "REST APIs", "FastAPI", "Python", "Asynchronous Programming", "Background Task Processing", "Celery", "RabbitMQ", "Redis", "Redis Pub/Sub", "Server-Sent Events (SSE)", "Real-Time Systems", "Notification Systems", "Containerization", "Docker", "Docker Compose", "Container Orchestration Concepts", "Infrastructure & DevOps", "CI/CD Concepts", "Developer Tooling (Makefile, scripts)", "Cloud Fundamentals", "Deployment", "PostgreSQL", "SQLAlchemy", "Relational Databases", "Database Design", "Data Modeling", "Query Optimization", "File Handling & Streaming", "Media Processing (Audio/Video)", "Image Processing Concepts", "Parallel Processing", "Threading", "Fault Tolerance", "Load Balancing Concepts", "Service-Oriented Architecture", "API Integration", "Authentication-ready Backend Patterns", "Validation & Schema Design (Pydantic)", "Middleware (CORS)", "Error Handling", "Logging (Loguru)", "Environment Management (.env)", "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "UI Engineering", "Component-Based Architecture", "State Management (Zustand)", "Frontend-Backend Integration", "Real-Time UI Updates", "File Upload Systems", "Progress Tracking Systems", "Modular Code Structure", "Debugging", "Performance Optimization", "Technical Documentation", "Problem Solving"]
  },
  {
    id: "sightranger",
    name: "SightRanger",
    description: "Built a real-time computer vision surveillance system using YOLOv8, FastAPI, and Next.js, enabling automated intrusion detection, alerting, and live monitoring through a responsive dashboard.",
    domainIds: ["intelligent-systems", "application-engineering", "backend-distributed", "data-storage", "infrastructure-devops", "languages-foundations"],
    skillIds: ["fastapi", "yolov8", "nextjs", "docker", "python", "computer-vision", "react", "typescript", "tailwind", "redis"],
    skillKeywords: ["Full Stack Development", "Application Engineering", "Backend & Distributed Systems", "Web Development", "Machine Learning", "Computer Vision", "Generative AI", "Intelligent Systems", "API Design", "REST APIs", "Microservices", "Event-Driven Systems", "System Design", "Scalability", "Distributed Systems", "FastAPI", "Python", "YOLOv8", "OpenCV", "Image Processing", "Video Processing", "Deep Learning Inference", "Real-Time Systems", "Background Task Processing", "Asynchronous Programming", "Celery-like Task Patterns", "Notification Systems", "Email/SMTP Integration", "Template Rendering (Jinja2)", "File Handling & Streaming", "Storage Systems", "Data Pipelines", "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "UI Engineering", "Responsive Design", "State Management (Zustand)", "API Integration (Axios)", "WebRTC / Media Recording", "Frontend-Backend Integration", "Component-Based Architecture", "Modular Code Structure", "Validation & Schema Design (Pydantic)", "Middleware (CORS)", "Error Handling", "Logging & Debugging", "Performance Optimization", "Environment Management (.env)", "Docker", "Docker Compose", "Containerization", "CI/CD Concepts", "Developer Tooling (Makefile, scripts)", "Git", "GitHub", "Deployment", "Cloud Fundamentals", "Security Considerations", "Technical Documentation", "Problem Solving"]
  },
  {
    id: "pnb-internship",
    name: "Punjab National Bank Internship",
    description: "Built and optimized backend systems for litigation management at Punjab National Bank, improving workflow efficiency through REST APIs and database query optimization.",
    skillIds: ["nodejs", "express", "rest-apis", "mysql", "java-servlets", "jsp", "apache-tomcat", "database-design", "postgresql"]
  },
  {
    id: "usc-ta",
    name: "USC Teaching Assistant",
    description: "Taught cybersecurity, Python, and game development fundamentals to high school students, focusing on hands-on learning and problem-solving skills.",
    skillIds: ["python", "cybersecurity", "game-development", "problem-solving", "technical-communication"]
  },
  {
    id: "genai-research",
    name: "Generative AI Research",
    description: "Research on LLM and API integration strategies for practical AI-augmented workflows.",
    skillIds: ["llms", "generative-ai", "prompt-engineering", "api-integration", "python", "fastapi"]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Developed an interactive portfolio using React, Three.js, and GSAP, featuring a 3D skill visualization system and real-time animations.",
    skillIds: ["react", "nextjs", "typescript", "tailwind", "threejs", "react-three-fiber", "gsap"]
  },
  {
    id: "apple-iphone-website-clone",
    name: "Apple Website Clone",
    description: "Immersive Apple-style product showcase site with 3D scenes, polished motion, and responsive UI engineering.",
    domainIds: ["application-engineering", "languages-foundations"],
    skillIds: ["react", "javascript", "tailwind", "html", "css", "threejs", "react-three-fiber", "gsap", "responsive-design", "system-design", "performance-optimization", "git", "github", "deployment"],
    skillKeywords: ["Web Development", "UI Engineering", "Frontend Engineering", "Software Engineering", "System Design", "Component-Based Architecture", "React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Three.js", "React Three Fiber", "GSAP", "3D Modeling", "Animation Systems", "Scroll Animations", "Responsive Design", "UI/UX Design", "Performance Optimization", "Vite", "Modular Code Structure", "State Management", "Debugging", "Git", "GitHub", "Deployment"]
  },
  {
    id: "artsy-android-app",
    name: "Artsy Platform – Android App",
    description: "Built an Android app for discovering, saving, and exploring artwork, using modern Kotlin architecture with seamless backend integration for a smooth user experience.",
    domainIds: ["application-engineering", "backend-distributed", "data-storage", "languages-foundations"],
    skillIds: ["android", "firebase", "ui-design", "responsive-design", "api-integration", "problem-solving"],
    skillKeywords: ["Android Development", "Mobile App Development", "Kotlin", "Jetpack Compose", "UI Engineering", "MVVM Architecture", "State Management", "Navigation Architecture", "REST API Integration", "Retrofit", "OkHttp", "Gson", "Authentication Systems", "Session Management", "Persistent Storage (SharedPreferences)", "Coroutine-Based Asynchronous Programming", "Flow (StateFlow)", "Reactive Programming", "Clean Architecture Principles", "Modular Code Structure", "Image Loading (Coil)", "Error Handling", "Form Validation", "UI/UX Design", "Material Design 3", "Favorites System", "Backend Integration", "Debugging", "Testing", "Gradle Build System"]
  },
  {
    id: "chatbot-template",
    name: "Chatbot Template",
    description: "Lightweight NLP chatbot prototype with intent modeling, TF-IDF features, and Streamlit UI.",
    domainIds: ["intelligent-systems", "application-engineering", "data-storage", "languages-foundations"],
    skillIds: ["python", "scikit-learn", "data-science", "predictive-modeling", "problem-solving"],
    skillKeywords: ["Python", "Machine Learning", "Natural Language Processing", "scikit-learn", "TF-IDF Vectorization", "Logistic Regression", "Predictive Modeling", "NLTK", "Streamlit", "Data Modeling", "Data Analysis", "Application Engineering", "Software Engineering", "Problem Solving", "Debugging", "UI Development"]
  },
  {
    id: "codebundle",
    name: "CodeBundle",
    description: "Go CLI for bundling full codebases into a single structured text artifact for AI tools and reviews.",
    domainIds: ["backend-distributed", "data-storage", "infrastructure-devops", "languages-foundations"],
    skillIds: ["go", "system-design", "data-pipelines", "performance-optimization", "debugging", "problem-solving", "technical-communication"],
    skillKeywords: ["Go", "Backend & Distributed Systems", "Application Engineering", "Software Engineering", "CLI Development", "System Design", "Microservices (modular package architecture)", "Event-Driven Systems (channel-based concurrency)", "Concurrency (Goroutines)", "Data Modeling", "File System Operations", "ETL Concepts", "Data Pipelines", "Performance Optimization", "Buffer-Based I/O", "GitIgnore Parsing", "API Design (CLI interface)", "Developer Tooling", "Debugging", "Error Handling", "Scalability", "Logical Thinking", "Systematic Analysis", "Technical Documentation"]
  },
  {
    id: "artsy-website",
    name: "Artsy Platform – Web App",
    description: "Full-stack web art platform with Angular frontend, Node/Express backend, and secure session-based workflows.",
    domainIds: ["application-engineering", "backend-distributed", "data-storage", "infrastructure-devops", "languages-foundations"],
    skillIds: ["nodejs", "express", "rest-apis", "mongodb", "api-integration", "responsive-design", "performance-optimization", "deployment"],
    skillKeywords: ["Full Stack Development", "Frontend Developmethe nt (Angular)", "Backend Development (Node.js, Express)", "REST API Design", "Authentication & Authorization (JWT, Cookies)", "Database Management (MongoDB, Mongoose)", "API Integration (Artsy API)", "State Management", "Reactive Programming (RxJS)", "UI/UX Development", "Component-Based Architecture", "Client-Server Architecture", "Secure Session Handling", "Middleware Design", "Error Handling", "Data Fetching & Caching", "Deployment (Google Cloud App Engine)", "Performance Optimization", "Debugging", "Software Engineering"]
  },
  {
    id: "morph-runner",
    name: "Morph Runner",
    description: "Unity runner game with morphing mechanics, real-time systems, and gameplay-focused engineering.",
    domainIds: ["application-engineering", "languages-foundations"],
    skillIds: ["game-development", "unity", "c#", "responsive-design", "performance-optimization", "git", "problem-solving"],
    skillKeywords: ["Game Development", "Unity Engine", "C# Programming", "Gameplay Engineering", "Physics Systems", "Character Mechanics (Morphing System)", "Animation Systems", "Collision Detection", "Level Design", "Procedural Logic", "Input Handling", "State Management (Finite State Machines)", "Event-Driven Gameplay", "UI/UX in Games", "Performance Optimization", "Object-Oriented Design", "Modular Architecture", "Debugging", "Game Testing", "Iterative Development", "Asset Integration", "Audio Integration", "Version Control (Git)", "Problem Solving", "Real-Time Systems"]
  },
  {
    id: "dsa",
    name: "DSA",
    description: "Data structures and algorithms problem-solving work spanning core CS patterns and complexity analysis.",
    domainIds: ["languages-foundations"],
    skillIds: ["data-structures", "algorithms", "problem-solving", "python", "technical-communication", "performance-optimization", "code-review"],
    skillKeywords: ["CS Fundamentals", "Data Structures", "Algorithms", "Problem Solving", "Logical Thinking", "Systematic Analysis", "Python", "Programming Languages", "Software Engineering", "Debugging", "Performance Optimization", "Technical Documentation", "Arrays", "Sorting Algorithms", "Recursion", "Hashing", "Two-Pointer Techniques", "Sliding Window / Prefix Sum Concepts", "Kadane’s Algorithm", "Boyer-Moore Voting Algorithm", "Search Algorithms", "Mathematical Problem Solving", "Time Complexity Analysis", "Space Complexity Analysis", "Competitive Programming", "Code Review", "Technical Communication"]
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator Platform",
    description: "Full-stack invoicing platform with auth, PDF generation, data modeling, and frontend-backend integration.",
    domainIds: ["application-engineering", "backend-distributed", "data-storage", "infrastructure-devops", "languages-foundations"],
    skillIds: ["react", "nodejs", "express", "javascript", "typescript", "tailwind", "html", "css", "rest-apis", "microservices", "system-design", "mongodb", "database-design", "data-pipelines", "api-integration", "performance-optimization", "git", "github", "deployment"],
    skillKeywords: ["Web Development", "Full Stack Development", "Application Engineering", "Backend & Distributed Systems", "API Design", "REST APIs", "Microservices", "Software Engineering", "System Design", "Component-Based Architecture", "MVC Architecture", "Node.js", "Express.js", "JavaScript", "TypeScript", "React", "Vite", "Tailwind CSS", "HTML", "CSS", "React Router", "Redux Toolkit", "State Management", "React Query", "Axios", "API Integration", "Authentication Systems", "JWT (JSON Web Tokens)", "Authorization Middleware", "Backend Security", "Password Hashing (bcrypt)", "MongoDB", "Mongoose", "NoSQL & Caching", "Database Design", "Data Modeling", "Relational Mapping Concepts", "Query Optimization", "Data Flow Management", "Event-Driven Systems", "PDF Generation (Puppeteer)", "Server-Side Rendering (HTML to PDF)", "Dynamic Template Generation", "Business Logic Implementation", "Form Handling (Formik/Yup)", "Input Validation", "Error Handling", "Middleware Design", "Modular Code Structure", "Hooks Architecture", "Frontend-Backend Integration", "Environment Management (.env)", "Debugging", "Performance Optimization", "Technical Documentation", "Git", "GitHub", "Deployment"]
  },
  {
    id: "malaria-classification",
    name: "Malaria Detection using Deep Learning",
    description: "Machine learning and image classification pipeline for malaria prediction and model evaluation.",
    domainIds: ["intelligent-systems", "data-storage", "languages-foundations"],
    skillIds: ["python", "scikit-learn", "numpy", "pandas", "predictive-modeling", "computer-vision", "technical-communication", "problem-solving"],
    skillKeywords: ["Machine Learning", "Data Science", "Computer Vision", "Image Processing", "Predictive Modeling", "ML Modeling", "Python", "scikit-learn", "pandas", "NumPy", "Supervised Learning", "Classification Algorithms", "Random Forest", "AdaBoost", "Model Training", "Model Evaluation", "Classification Metrics", "Data Preprocessing", "Train-Test Split", "Feature Engineering", "Dataset Handling", "CSV Data Processing", "Model Persistence (joblib)", "Experimentation", "Performance Evaluation", "Scientific Computing", "Technical Documentation", "Problem Solving"]
  },
  {
    id: "music-store-analysis",
    name: "Music Store Analytics",
    description: "SQL-heavy analytics case study focused on customer, revenue, and inventory insights.",
    domainIds: ["data-storage", "languages-foundations"],
    skillIds: ["sql", "postgresql", "database-design", "query-optimization", "analytics", "etl", "data-science", "technical-communication", "problem-solving"],
    skillKeywords: ["Data Analysis", "Data Science", "Relational Databases", "SQL", "PostgreSQL", "Database Design", "Data Modeling", "Query Optimization", "Business Intelligence", "Analytics", "ETL Concepts", "Data Warehousing", "Data Exploration", "Data Aggregation", "Data Transformation", "Window Functions", "Joins (INNER, LEFT, etc.)", "Subqueries", "Common Table Expressions (CTEs)", "Group By & Aggregations", "Filtering & Sorting", "Statistical Analysis", "Customer Behavior Analysis", "Sales Analytics", "Revenue Analysis", "Inventory Analysis", "Performance Analysis", "Reporting", "Insight Generation", "Technical Documentation", "Problem Solving", "Logical Thinking"]
  },
  {
    id: "sales-analysis",
    name: "Sales Analysis Dashboard",
    description: "Python analytics project for cleaning, visualizing, and extracting business insight from sales data.",
    domainIds: ["data-storage", "languages-foundations"],
    skillIds: ["python", "pandas", "numpy", "matplotlib", "analytics", "data-science", "technical-communication", "problem-solving"],
    skillKeywords: ["Data Science", "Data Analysis", "Analytics", "Business Intelligence", "Python", "pandas", "NumPy", "Matplotlib", "Data Visualization", "Data Cleaning", "Data Preprocessing", "Exploratory Data Analysis (EDA)", "CSV Data Processing", "Statistical Analysis", "Trend Analysis", "Customer Behavior Analysis", "Sales Analytics", "Predictive Insights", "Data Transformation", "Data Aggregation", "Reporting", "Insight Generation", "Jupyter Notebook", "Technical Documentation", "Problem Solving", "Logical Thinking"]
  },
  {
    id: "taxi-demand-prediction",
    name: "Taxi Demand Prediction",
    description: "Forecasting project using time-series models, deep learning, and large-scale data processing pipelines.",
    domainIds: ["intelligent-systems", "data-storage", "languages-foundations"],
    skillIds: ["python", "numpy", "pandas", "data-science", "predictive-modeling", "data-pipelines", "etl", "performance-optimization", "analytics", "problem-solving", "technical-communication"],
    skillKeywords: ["Machine Learning", "Data Science", "Predictive Modeling", "Time Series Analysis", "Deep Learning", "Data Analysis", "Data Pipelines", "ETL Concepts", "Data Engineering", "Python", "pandas", "NumPy", "Dask", "Parquet", "Data Preprocessing", "Data Cleaning", "Feature Engineering", "Exploratory Data Analysis (EDA)", "Data Aggregation", "Statistical Analysis", "Forecasting Models", "ARIMA", "LSTM", "Neural Networks", "Model Training", "Model Evaluation", "Hyperparameter Tuning", "Grid Search", "Walk-Forward Validation", "Time Series Stationarity Testing (ADF, KPSS)", "Autocorrelation Analysis (ACF, PACF)", "Scaling & Normalization", "Big Data Processing", "Performance Optimization", "Visualization", "Business Intelligence", "Analytics", "Real-Time Prediction Systems", "Problem Solving", "Logical Thinking", "Technical Documentation"]
  }
];

// ============================================================================
// DOMAINS DATA
// ============================================================================

export const domains: Domain[] = [
  {
    id: "intelligent-systems",
    name: "Intelligent Systems",
    shortName: "AI & ML",
    color: "#34d6ff",
    accent: "cyan",
    description: "AI, machine learning, computer vision, and data-driven workflows used to build intelligent product experiences.",
    whyItMatters: "This layer shows my ability to apply AI and data techniques to practical systems rather than treating AI as a standalone buzzword.",
    subclusterIds: ["machine-learning", "generative-ai", "computer-vision", "data-science"],
    featuredProjectIds: ["sightranger", "genai-research"],
    highlightedSkillIds: ["python", "llms", "tensorflow", "yolov8", "huggingface", "numpy", "pandas"]
  },
  {
    id: "application-engineering",
    name: "Application Engineering",
    shortName: "Apps & UI",
    color: "#d45cff",
    accent: "magenta",
    description: "Web, mobile, dashboard, and interactive application development across user-facing product surfaces.",
    whyItMatters: "This layer represents my ability to turn systems into usable products across platforms and interfaces.",
    subclusterIds: ["web-development", "mobile-development", "game-development", "ui-engineering"],
    featuredProjectIds: ["portfolio", "sightranger", "transizr"],
    highlightedSkillIds: ["react", "nextjs", "typescript", "javascript", "tailwind", "swift", "swiftui"]
  },
  {
    id: "backend-distributed",
    name: "Backend & Distributed Systems",
    shortName: "Backend",
    color: "#ff9c3f",
    accent: "orange",
    description: "APIs, services, queues, async workflows, and distributed architecture patterns for scalable software.",
    whyItMatters: "This layer connects product logic with reliability, performance, and system-level thinking.",
    subclusterIds: ["api-design", "microservices", "event-driven-systems", "system-design"],
    featuredProjectIds: ["transizr", "pnb-internship", "sightranger"],
    highlightedSkillIds: ["fastapi", "nodejs", "express", "rest-apis", "celery", "rabbitmq", "redis"]
  },
  {
    id: "data-storage",
    name: "Data & Storage Systems",
    shortName: "Data",
    color: "#34ff88",
    accent: "green",
    description: "Databases, caching, data pipelines, query design, and analytics foundations for reliable data handling.",
    whyItMatters: "This layer shows how I structure, store, retrieve, and analyze data across software systems.",
    subclusterIds: ["relational-databases", "nosql-caching", "data-modeling", "data-analysis"],
    featuredProjectIds: ["transizr", "pnb-internship", "sightranger"],
    highlightedSkillIds: ["postgresql", "mysql", "redis", "firebase", "sql", "database-design"]
  },
  {
    id: "infrastructure-devops",
    name: "Infrastructure & DevOps",
    shortName: "Infra",
    color: "#b16cff",
    accent: "purple",
    description: "Containers, deployment workflows, automation, version control, and production-readiness practices.",
    whyItMatters: "This layer shows my understanding of how software moves from local development to maintainable systems.",
    subclusterIds: ["containers", "ci-cd", "cloud-fundamentals", "developer-tooling"],
    featuredProjectIds: ["transizr", "sightranger", "pnb-internship"],
    highlightedSkillIds: ["docker", "docker-compose", "git", "github", "apache-tomcat", "aws", "deployment"]
  },
  {
    id: "languages-foundations",
    name: "Languages & Foundations",
    shortName: "Foundations",
    color: "#ff5466",
    accent: "red",
    description: "Programming languages, CS fundamentals, engineering practices, and problem-solving foundations.",
    whyItMatters: "This layer represents the fundamentals that let me adapt across stacks, domains, and engineering problems.",
    subclusterIds: ["programming-languages", "cs-fundamentals", "software-engineering", "problem-solving"],
    featuredProjectIds: ["pnb-internship", "usc-ta", "genai-research"],
    highlightedSkillIds: ["python", "javascript", "typescript", "go", "swift", "java", "sql", "oop", "data-structures"]
  }
];

// ============================================================================
// SUBCLUSTERS DATA
// ============================================================================

export const subclusters: Subcluster[] = [
  // Intelligent Systems
  { id: "machine-learning", name: "Machine Learning", domainId: "intelligent-systems", description: "ML models, training pipelines, and predictive systems", skillIds: ["tensorflow", "scikit-learn", "pytorch", "ml-modeling"] },
  { id: "generative-ai", name: "Generative AI", domainId: "intelligent-systems", description: "LLMs, prompt engineering, and AI-generated content", skillIds: ["llms", "generative-ai", "prompt-engineering", "huggingface", "langchain"] },
  { id: "computer-vision", name: "Computer Vision", domainId: "intelligent-systems", description: "Image processing, object detection, and visual AI", skillIds: ["yolov8", "opencv", "computer-vision", "image-processing"] },
  { id: "data-science", name: "Data Science", domainId: "intelligent-systems", description: "Data analysis, visualization, and statistical modeling", skillIds: ["numpy", "pandas", "matplotlib", "data-science", "predictive-modeling"] },
  
  // Application Engineering
  { id: "web-development", name: "Web Development", domainId: "application-engineering", description: "Full-stack web applications and frameworks", skillIds: ["react", "nextjs", "javascript", "typescript", "tailwind", "html", "css"] },
  { id: "mobile-development", name: "Mobile Development", domainId: "application-engineering", description: "iOS and Android native applications", skillIds: ["swift", "swiftui", "ios-development", "android", "react-native"] },
  { id: "game-development", name: "Game Development", domainId: "application-engineering", description: "Game logic, physics, and interactive experiences", skillIds: ["game-development", "unity", "c#", "game-physics"] },
  { id: "ui-engineering", name: "UI Engineering", domainId: "application-engineering", description: "User interface design and implementation", skillIds: ["ui-design", "responsive-design", "accessibility", "animation"] },
  
  // Backend & Distributed Systems
  { id: "api-design", name: "API Design", domainId: "backend-distributed", description: "RESTful APIs, GraphQL, and service contracts", skillIds: ["rest-apis", "graphql", "fastapi", "express", "api-documentation"] },
  { id: "microservices", name: "Microservices", domainId: "backend-distributed", description: "Service architecture and decomposition", skillIds: ["microservices", "service-mesh", "api-gateway", "container-orchestration"] },
  { id: "event-driven-systems", name: "Event-Driven Systems", domainId: "backend-distributed", description: "Message queues, event sourcing, and async workflows", skillIds: ["event-driven", "celery", "rabbitmq", "kafka", "redis-pubsub"] },
  { id: "system-design", name: "System Design", domainId: "backend-distributed", description: "Scalability patterns and distributed architecture", skillIds: ["distributed-systems", "system-design", "scalability", "load-balancing"] },
  
  // Data & Storage Systems
  { id: "relational-databases", name: "Relational Databases", domainId: "data-storage", description: "SQL databases and query optimization", skillIds: ["postgresql", "mysql", "sql", "database-design", "query-optimization"] },
  { id: "nosql-caching", name: "NoSQL & Caching", domainId: "data-storage", description: "Document stores, key-value stores, and caching layers", skillIds: ["redis", "mongodb", "firebase", "caching-strategies"] },
  { id: "data-modeling", name: "Data Modeling", domainId: "data-storage", description: "Schema design and data architecture", skillIds: ["database-design", "er-modeling", "normalization", "data-warehousing"] },
  { id: "data-analysis", name: "Data Analysis", domainId: "data-storage", description: "ETL pipelines and analytics workflows", skillIds: ["etl", "data-pipelines", "analytics", "business-intelligence"] },
  
  // Infrastructure & DevOps
  { id: "containers", name: "Containers", domainId: "infrastructure-devops", description: "Docker, Kubernetes, and containerization", skillIds: ["docker", "docker-compose", "kubernetes", "containerization"] },
  { id: "ci-cd", name: "CI/CD", domainId: "infrastructure-devops", description: "Continuous integration and deployment pipelines", skillIds: ["ci-cd", "github-actions", "jenkins", "automated-testing"] },
  { id: "cloud-fundamentals", name: "Cloud Fundamentals", domainId: "infrastructure-devops", description: "Cloud platforms and serverless computing", skillIds: ["aws", "gcp", "azure", "serverless", "cloudformation"] },
  { id: "developer-tooling", name: "Developer Tooling", domainId: "infrastructure-devops", description: "Version control, debugging, and productivity tools", skillIds: ["git", "github", "debugging", "performance-optimization", "environment-management"] },
  
  // Languages & Foundations
  { id: "programming-languages", name: "Programming Languages", domainId: "languages-foundations", description: "Multiple programming languages and paradigms", skillIds: ["python", "javascript", "typescript", "go", "swift", "java", "c#", "sql"] },
  { id: "cs-fundamentals", name: "CS Fundamentals", domainId: "languages-foundations", description: "Computer science core concepts", skillIds: ["data-structures", "algorithms", "oop", "functional-programming"] },
  { id: "software-engineering", name: "Software Engineering", domainId: "languages-foundations", description: "Development practices and methodologies", skillIds: ["agile", "scrum", "tdd", "code-review", "technical-documentation"] },
  { id: "problem-solving", name: "Problem Solving", domainId: "languages-foundations", description: "Analytical thinking and solution design", skillIds: ["problem-solving", "debugging", "logical-thinking", "systematic-analysis"] }
];

// ============================================================================
// SKILLS DATA
// ============================================================================

export const skills: Skill[] = [
  // Intelligent Systems
  { id: "python", name: "Python", type: "language", importance: "core", description: "Primary language for backend, AI, and automation", domainIds: ["intelligent-systems", "backend-distributed", "data-storage", "languages-foundations"], subclusterIds: ["machine-learning", "generative-ai", "data-science", "api-design", "event-driven-systems", "programming-languages", "cs-fundamentals"], relatedProjectIds: ["sightranger", "transizr", "genai-research", "usc-ta"] },
  { id: "llms", name: "LLMs", type: "concept", importance: "core", description: "Large language models for natural language processing", domainIds: ["intelligent-systems"], subclusterIds: ["generative-ai"], relatedProjectIds: ["genai-research", "sightranger"] },
  { id: "generative-ai", name: "Generative AI", type: "concept", importance: "core", description: "AI systems that generate content, text, and media", domainIds: ["intelligent-systems"], subclusterIds: ["generative-ai"], relatedProjectIds: ["genai-research"] },
  { id: "prompt-engineering", name: "Prompt Engineering", type: "concept", importance: "strong", description: "Creating precise prompts for AI workflows", domainIds: ["intelligent-systems"], subclusterIds: ["generative-ai"], relatedProjectIds: ["genai-research", "sightranger"] },
  { id: "tensorflow", name: "TensorFlow", type: "framework", importance: "strong", description: "Machine learning framework for neural networks", domainIds: ["intelligent-systems"], subclusterIds: ["machine-learning"], relatedProjectIds: ["sightranger"] },
  { id: "yolov8", name: "YOLOv8", type: "library", importance: "strong", description: "Real-time object detection and computer vision", domainIds: ["intelligent-systems"], subclusterIds: ["computer-vision"], relatedProjectIds: ["sightranger"] },
  { id: "huggingface", name: "Hugging Face", type: "platform", importance: "strong", description: "Model hub and transformer pipelines", domainIds: ["intelligent-systems"], subclusterIds: ["generative-ai", "machine-learning"], relatedProjectIds: ["genai-research"] },
  { id: "numpy", name: "NumPy", type: "library", importance: "core", description: "Numerical computing and array operations", domainIds: ["intelligent-systems", "data-storage"], subclusterIds: ["data-science", "machine-learning"], relatedProjectIds: ["sightranger", "genai-research"] },
  { id: "pandas", name: "pandas", type: "library", importance: "core", description: "Data manipulation and analysis", domainIds: ["intelligent-systems", "data-storage"], subclusterIds: ["data-science", "data-analysis"], relatedProjectIds: ["genai-research"] },
  { id: "computer-vision", name: "Computer Vision", type: "concept", importance: "core", description: "Visual analysis and image processing systems", domainIds: ["intelligent-systems"], subclusterIds: ["computer-vision"], relatedProjectIds: ["sightranger"] },
  { id: "scikit-learn", name: "scikit-learn", type: "library", importance: "strong", description: "Machine learning algorithms and tools", domainIds: ["intelligent-systems"], subclusterIds: ["machine-learning"], relatedProjectIds: ["genai-research"] },
  { id: "pytorch", name: "PyTorch", type: "framework", importance: "familiar", description: "Deep learning framework", domainIds: ["intelligent-systems"], subclusterIds: ["machine-learning"], relatedProjectIds: [] },
  { id: "opencv", name: "OpenCV", type: "library", importance: "familiar", description: "Computer vision library", domainIds: ["intelligent-systems"], subclusterIds: ["computer-vision"], relatedProjectIds: ["sightranger"] },
  { id: "data-science", name: "Data Science", type: "concept", importance: "strong", description: "Data analysis and statistical modeling", domainIds: ["intelligent-systems"], subclusterIds: ["data-science"], relatedProjectIds: ["genai-research"] },
  { id: "predictive-modeling", name: "Predictive Modeling", type: "concept", importance: "familiar", description: "Building models for forecasting and predictions", domainIds: ["intelligent-systems"], subclusterIds: ["machine-learning", "data-science"], relatedProjectIds: [] },
  
  // Application Engineering
  { id: "react", name: "React", type: "framework", importance: "core", description: "Building polished, component-driven interfaces", domainIds: ["application-engineering"], subclusterIds: ["web-development", "ui-engineering"], relatedProjectIds: ["portfolio", "sightranger", "transizr"] },
  { id: "nextjs", name: "Next.js", type: "framework", importance: "core", description: "Server-rendered and hybrid React applications", domainIds: ["application-engineering"], subclusterIds: ["web-development"], relatedProjectIds: ["portfolio", "sightranger"] },
  { id: "typescript", name: "TypeScript", type: "language", importance: "core", description: "Typed code that scales across UI and system layers", domainIds: ["application-engineering", "languages-foundations"], subclusterIds: ["web-development", "programming-languages"], relatedProjectIds: ["portfolio", "sightranger", "transizr"] },
  { id: "javascript", name: "JavaScript", type: "language", importance: "core", description: "Client-side logic and interactive user experiences", domainIds: ["application-engineering", "languages-foundations"], subclusterIds: ["web-development", "programming-languages"], relatedProjectIds: ["portfolio", "transizr"] },
  { id: "tailwind", name: "Tailwind CSS", type: "framework", importance: "core", description: "Fast, consistent UI styling for premium layouts", domainIds: ["application-engineering"], subclusterIds: ["web-development", "ui-engineering"], relatedProjectIds: ["portfolio", "transizr"] },
  { id: "swift", name: "Swift", type: "language", importance: "strong", description: "iOS and macOS application development", domainIds: ["application-engineering", "languages-foundations"], subclusterIds: ["mobile-development", "programming-languages"], relatedProjectIds: [] },
  { id: "swiftui", name: "SwiftUI", type: "framework", importance: "strong", description: "Declarative UI framework for Apple platforms", domainIds: ["application-engineering"], subclusterIds: ["mobile-development"], relatedProjectIds: [] },
  { id: "html", name: "HTML", type: "language", importance: "core", description: "Markup language for web content", domainIds: ["application-engineering"], subclusterIds: ["web-development"], relatedProjectIds: ["portfolio", "transizr"] },
  { id: "css", name: "CSS", type: "language", importance: "core", description: "Styling and layout for web interfaces", domainIds: ["application-engineering"], subclusterIds: ["web-development", "ui-engineering"], relatedProjectIds: ["portfolio", "transizr"] },
  { id: "ios-development", name: "iOS Development", type: "concept", importance: "strong", description: "Native iOS application development", domainIds: ["application-engineering"], subclusterIds: ["mobile-development"], relatedProjectIds: [] },
  { id: "android", name: "Android", type: "platform", importance: "familiar", description: "Android mobile development", domainIds: ["application-engineering"], subclusterIds: ["mobile-development"], relatedProjectIds: [] },
  { id: "react-native", name: "React Native", type: "framework", importance: "familiar", description: "Cross-platform mobile development", domainIds: ["application-engineering"], subclusterIds: ["mobile-development"], relatedProjectIds: [] },
  { id: "threejs", name: "Three.js", type: "library", importance: "strong", description: "3D graphics and WebGL", domainIds: ["application-engineering"], subclusterIds: ["ui-engineering"], relatedProjectIds: ["portfolio"] },
  { id: "react-three-fiber", name: "React Three Fiber", type: "library", importance: "strong", description: "React renderer for Three.js", domainIds: ["application-engineering"], subclusterIds: ["ui-engineering"], relatedProjectIds: ["portfolio"] },
  { id: "gsap", name: "GSAP", type: "library", importance: "strong", description: "Animation platform for web", domainIds: ["application-engineering"], subclusterIds: ["ui-engineering"], relatedProjectIds: ["portfolio"] },
  { id: "ui-design", name: "UI Design", type: "concept", importance: "strong", description: "User interface design principles", domainIds: ["application-engineering"], subclusterIds: ["ui-engineering"], relatedProjectIds: ["portfolio"] },
  { id: "responsive-design", name: "Responsive Design", type: "concept", importance: "core", description: "Adaptive layouts across devices", domainIds: ["application-engineering"], subclusterIds: ["ui-engineering"], relatedProjectIds: ["portfolio"] },
  { id: "game-development", name: "Game Development", type: "concept", importance: "strong", description: "Game logic and interactive experiences", domainIds: ["application-engineering"], subclusterIds: ["game-development"], relatedProjectIds: ["usc-ta"] },
  { id: "unity", name: "Unity", type: "tool", importance: "familiar", description: "Game engine and development platform", domainIds: ["application-engineering"], subclusterIds: ["game-development"], relatedProjectIds: [] },
  { id: "c#", name: "C#", type: "language", importance: "familiar", description: "Object-oriented language for games and .NET", domainIds: ["application-engineering", "languages-foundations"], subclusterIds: ["game-development", "programming-languages"], relatedProjectIds: [] },
  
  // Backend & Distributed Systems
  { id: "fastapi", name: "FastAPI", type: "framework", importance: "core", description: "High-performance Python API design", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "nodejs", name: "Node.js", type: "framework", importance: "core", description: "Server-side JavaScript runtime", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["pnb-internship", "transizr"] },
  { id: "express", name: "Express.js", type: "framework", importance: "strong", description: "REST API and middleware systems", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["pnb-internship"] },
  { id: "rest-apis", name: "REST APIs", type: "concept", importance: "core", description: "Reliable API design for modern applications", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["transizr", "pnb-internship", "sightranger"] },
  { id: "event-driven", name: "Event-Driven Architecture", type: "concept", importance: "core", description: "Asynchronous systems for scalable workflows", domainIds: ["backend-distributed"], subclusterIds: ["event-driven-systems"], relatedProjectIds: ["transizr"] },
  { id: "celery", name: "Celery", type: "tool", importance: "core", description: "Task orchestration for scalable async jobs", domainIds: ["backend-distributed"], subclusterIds: ["event-driven-systems"], relatedProjectIds: ["transizr"] },
  { id: "rabbitmq", name: "RabbitMQ", type: "tool", importance: "core", description: "Message queues for resilient background workflows", domainIds: ["backend-distributed"], subclusterIds: ["event-driven-systems"], relatedProjectIds: ["transizr"] },
  { id: "distributed-systems", name: "Distributed Systems", type: "concept", importance: "core", description: "Designing systems that scale across services", domainIds: ["backend-distributed"], subclusterIds: ["system-design", "event-driven-systems"], relatedProjectIds: ["transizr"] },
  { id: "microservices", name: "Microservices", type: "concept", importance: "strong", description: "Modular service design for flexibility", domainIds: ["backend-distributed"], subclusterIds: ["microservices"], relatedProjectIds: ["transizr"] },
  { id: "system-design", name: "System Design", type: "concept", importance: "strong", description: "Architecture patterns for scalable systems", domainIds: ["backend-distributed"], subclusterIds: ["system-design"], relatedProjectIds: ["transizr"] },
  { id: "scalability", name: "Scalability", type: "concept", importance: "strong", description: "Designing for growth and load handling", domainIds: ["backend-distributed"], subclusterIds: ["system-design"], relatedProjectIds: ["transizr"] },
  { id: "java-servlets", name: "Java Servlets", type: "framework", importance: "familiar", description: "Java web application framework", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["pnb-internship"] },
  { id: "jsp", name: "JSP", type: "framework", importance: "familiar", description: "JavaServer Pages for dynamic content", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["pnb-internship"] },
  { id: "api-documentation", name: "API Documentation", type: "concept", importance: "strong", description: "Clear and comprehensive API docs", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: ["transizr", "pnb-internship"] },
  { id: "graphql", name: "GraphQL", type: "concept", importance: "familiar", description: "Query language for APIs", domainIds: ["backend-distributed"], subclusterIds: ["api-design"], relatedProjectIds: [] },
  
  // Data & Storage Systems
  { id: "postgresql", name: "PostgreSQL", type: "database", importance: "core", description: "Reliable relational data modeling", domainIds: ["data-storage"], subclusterIds: ["relational-databases"], relatedProjectIds: ["pnb-internship", "transizr"] },
  { id: "mysql", name: "MySQL", type: "database", importance: "core", description: "Production-grade transactional databases", domainIds: ["data-storage"], subclusterIds: ["relational-databases"], relatedProjectIds: ["pnb-internship"] },
  { id: "sql", name: "SQL", type: "language", importance: "core", description: "Structured queries for data operations", domainIds: ["data-storage", "languages-foundations"], subclusterIds: ["relational-databases", "programming-languages"], relatedProjectIds: ["pnb-internship", "transizr"] },
  { id: "redis", name: "Redis", type: "database", importance: "core", description: "Caching and fast data layer", domainIds: ["data-storage", "backend-distributed"], subclusterIds: ["nosql-caching", "event-driven-systems"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "firebase", name: "Firebase", type: "platform", importance: "strong", description: "Realtime backend and authentication", domainIds: ["data-storage"], subclusterIds: ["nosql-caching"], relatedProjectIds: ["portfolio"] },
  { id: "database-design", name: "Database Design", type: "concept", importance: "core", description: "Schema architecture and modeling", domainIds: ["data-storage"], subclusterIds: ["data-modeling"], relatedProjectIds: ["pnb-internship", "transizr"] },
  { id: "query-optimization", name: "Query Optimization", type: "concept", importance: "strong", description: "Performance tuning for databases", domainIds: ["data-storage"], subclusterIds: ["relational-databases"], relatedProjectIds: ["pnb-internship"] },
  { id: "mongodb", name: "MongoDB", type: "database", importance: "familiar", description: "NoSQL document database", domainIds: ["data-storage"], subclusterIds: ["nosql-caching"], relatedProjectIds: [] },
  { id: "etl", name: "ETL Concepts", type: "concept", importance: "familiar", description: "Extract, transform, load pipelines", domainIds: ["data-storage"], subclusterIds: ["data-analysis"], relatedProjectIds: [] },
  { id: "data-pipelines", name: "Data Pipelines", type: "concept", importance: "familiar", description: "Automated data flow systems", domainIds: ["data-storage"], subclusterIds: ["data-analysis"], relatedProjectIds: ["transizr"] },
  { id: "analytics", name: "Analytics", type: "concept", importance: "familiar", description: "Data analysis and insights", domainIds: ["data-storage"], subclusterIds: ["data-analysis"], relatedProjectIds: [] },
  { id: "caching-strategies", name: "Caching Strategies", type: "concept", importance: "strong", description: "Performance optimization through caching", domainIds: ["data-storage", "backend-distributed"], subclusterIds: ["nosql-caching"], relatedProjectIds: ["transizr"] },
  
  // Infrastructure & DevOps
  { id: "docker", name: "Docker", type: "tool", importance: "core", description: "Containerized deployments", domainIds: ["infrastructure-devops"], subclusterIds: ["containers"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "docker-compose", name: "Docker Compose", type: "tool", importance: "core", description: "Multi-container orchestration", domainIds: ["infrastructure-devops"], subclusterIds: ["containers"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "git", name: "Git", type: "tool", importance: "core", description: "Version control system", domainIds: ["infrastructure-devops"], subclusterIds: ["developer-tooling"], relatedProjectIds: ["all"] },
  { id: "github", name: "GitHub", type: "platform", importance: "core", description: "Code hosting and collaboration", domainIds: ["infrastructure-devops"], subclusterIds: ["developer-tooling"], relatedProjectIds: ["all"] },
  { id: "apache-tomcat", name: "Apache Tomcat", type: "tool", importance: "strong", description: "Java servlet container", domainIds: ["infrastructure-devops"], subclusterIds: ["containers"], relatedProjectIds: ["pnb-internship"] },
  { id: "aws", name: "AWS", type: "platform", importance: "familiar", description: "Amazon cloud services", domainIds: ["infrastructure-devops"], subclusterIds: ["cloud-fundamentals"], relatedProjectIds: [] },
  { id: "deployment", name: "Deployment", type: "concept", importance: "core", description: "Production release processes", domainIds: ["infrastructure-devops"], subclusterIds: ["ci-cd"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "ci-cd", name: "CI/CD Concepts", type: "concept", importance: "strong", description: "Continuous integration and delivery", domainIds: ["infrastructure-devops"], subclusterIds: ["ci-cd"], relatedProjectIds: ["transizr"] },
  { id: "github-actions", name: "GitHub Actions", type: "tool", importance: "familiar", description: "Workflow automation", domainIds: ["infrastructure-devops"], subclusterIds: ["ci-cd"], relatedProjectIds: [] },
  { id: "kubernetes", name: "Kubernetes", type: "tool", importance: "familiar", description: "Container orchestration", domainIds: ["infrastructure-devops"], subclusterIds: ["containers"], relatedProjectIds: [] },
  { id: "containerization", name: "Containerization", type: "concept", importance: "core", description: "Packaging applications in containers", domainIds: ["infrastructure-devops"], subclusterIds: ["containers"], relatedProjectIds: ["transizr", "sightranger"] },
  { id: "debugging-infra", name: "Debugging", type: "concept", importance: "core", description: "Finding and fixing issues", domainIds: ["infrastructure-devops", "languages-foundations"], subclusterIds: ["developer-tooling", "problem-solving"], relatedProjectIds: ["all"] },
  { id: "performance-optimization", name: "Performance Optimization", type: "concept", importance: "strong", description: "Improving system efficiency", domainIds: ["infrastructure-devops"], subclusterIds: ["developer-tooling"], relatedProjectIds: ["transizr"] },
  { id: "environment-management", name: "Environment Management", type: "concept", importance: "strong", description: "Managing dev/staging/prod environments", domainIds: ["infrastructure-devops"], subclusterIds: ["developer-tooling"], relatedProjectIds: ["transizr"] },
  
  // Languages & Foundations
  { id: "go", name: "Go", type: "language", importance: "strong", description: "Compiled services and backend tooling", domainIds: ["languages-foundations"], subclusterIds: ["programming-languages"], relatedProjectIds: ["genai-research"] },
  { id: "java", name: "Java", type: "language", importance: "strong", description: "Enterprise and Android development", domainIds: ["languages-foundations"], subclusterIds: ["programming-languages"], relatedProjectIds: ["pnb-internship"] },
  { id: "oop", name: "OOP", type: "concept", importance: "core", description: "Object-oriented programming principles", domainIds: ["languages-foundations"], subclusterIds: ["cs-fundamentals"], relatedProjectIds: ["pnb-internship", "usc-ta"] },
  { id: "data-structures", name: "Data Structures", type: "concept", importance: "core", description: "Arrays, lists, trees, graphs, and more", domainIds: ["languages-foundations"], subclusterIds: ["cs-fundamentals"], relatedProjectIds: ["usc-ta"] },
  { id: "algorithms", name: "Algorithms", type: "concept", importance: "core", description: "Problem-solving algorithmic techniques", domainIds: ["languages-foundations"], subclusterIds: ["cs-fundamentals"], relatedProjectIds: ["usc-ta"] },
  { id: "agile", name: "Agile Development", type: "concept", importance: "strong", description: "Iterative development methodology", domainIds: ["languages-foundations"], subclusterIds: ["software-engineering"], relatedProjectIds: ["transizr"] },
  { id: "scrum", name: "Scrum", type: "concept", importance: "familiar", description: "Agile framework for project management", domainIds: ["languages-foundations"], subclusterIds: ["software-engineering"], relatedProjectIds: [] },
  { id: "tdd", name: "TDD", type: "concept", importance: "familiar", description: "Test-driven development", domainIds: ["languages-foundations"], subclusterIds: ["software-engineering"], relatedProjectIds: [] },
  { id: "code-review", name: "Code Review", type: "concept", importance: "strong", description: "Peer code inspection practices", domainIds: ["languages-foundations"], subclusterIds: ["software-engineering"], relatedProjectIds: ["all"] },
  { id: "technical-communication", name: "Technical Communication", type: "concept", importance: "core", description: "Clear technical documentation and explanation", domainIds: ["languages-foundations"], subclusterIds: ["software-engineering"], relatedProjectIds: ["usc-ta"] },
  { id: "problem-solving", name: "Problem Solving", type: "concept", importance: "core", description: "Analytical thinking and solution design", domainIds: ["languages-foundations"], subclusterIds: ["problem-solving"], relatedProjectIds: ["all"] },
  { id: "debugging-foundation", name: "Debugging", type: "concept", importance: "core", description: "Systematic issue identification and resolution", domainIds: ["languages-foundations"], subclusterIds: ["problem-solving"], relatedProjectIds: ["all"] },
  { id: "cybersecurity", name: "Cybersecurity", type: "concept", importance: "strong", description: "Security principles and practices", domainIds: ["languages-foundations"], subclusterIds: ["cs-fundamentals"], relatedProjectIds: ["usc-ta"] },
  { id: "functional-programming", name: "Functional Programming", type: "concept", importance: "familiar", description: "Functional programming paradigms", domainIds: ["languages-foundations"], subclusterIds: ["cs-fundamentals"], relatedProjectIds: [] },
  { id: "api-integration", name: "API Integration", type: "concept", importance: "core", description: "Connecting and integrating external APIs", domainIds: ["languages-foundations", "backend-distributed"], subclusterIds: ["programming-languages", "api-design"], relatedProjectIds: ["genai-research", "sightranger"] }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getDomain = (id: DomainId): Domain | undefined => 
  domains.find(d => d.id === id);

export const getSubcluster = (id: string): Subcluster | undefined => 
  subclusters.find(s => s.id === id);

export const getSkill = (id: string): Skill | undefined => 
  skills.find(s => s.id === id);

export const getProject = (id: string): Project | undefined => 
  projects.find(p => p.id === id);

export const getSkillsForDomain = (domainId: DomainId): Skill[] => 
  skills.filter(s => s.domainIds.includes(domainId));

export const getSubclustersForDomain = (domainId: DomainId): Subcluster[] => 
  subclusters.filter(s => s.domainId === domainId);

export const getProjectsForSkill = (skillId: string): Project[] => 
  projects.filter(p => p.skillIds.includes(skillId));

export const getProjectSearchTerms = (project: Project): string[] =>
  Array.from(
    new Set([
      project.name,
      project.description,
      ...project.skillIds,
      ...(project.skillKeywords ?? []),
    ])
  );

export const getCrossDomainSkills = (): Skill[] => 
  skills.filter(s => s.domainIds.length > 1);

export const getCoreStack = (): Skill[] => 
  skills.filter(s => s.importance === "core").slice(0, 8);

export const domainOrder: DomainId[] = [
  "intelligent-systems",
  "application-engineering", 
  "backend-distributed",
  "data-storage",
  "infrastructure-devops",
  "languages-foundations"
];
