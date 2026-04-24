export type CategoryId = "ai" | "backend" | "frontend" | "databases" | "infra" | "languages";

export type SkillItem = {
  id: string;
  name: string;
  importance: "core" | "strong" | "familiar";
  description: string;
  relatedProjects: string[];
};

export type SkillCategory = {
  id: CategoryId;
  title: string;
  color: string;
  accent: string;
  description: string;
  skills: SkillItem[];
  usedIn: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI / GenAI",
    color: "#34d6ff",
    accent: "cyan",
    description:
      "Building AI-powered workflows, LLM applications, and computer vision systems.",
    skills: [
      { id: "llm", name: "LLMs", importance: "core", description: "Designing and integrating large language models.", relatedProjects: ["SightRanger", "Research publication on Generative AI Integration using APIs"] },
      { id: "prompt", name: "Prompt Engineering", importance: "strong", description: "Creating precise prompts for AI workflows.", relatedProjects: ["SightRanger", "Research publication on Generative AI Integration using APIs"] },
      { id: "tensorflow", name: "TensorFlow", importance: "strong", description: "Training and deploying production-ready neural models.", relatedProjects: ["SightRanger"] },
      { id: "yolov8", name: "YOLOv8", importance: "strong", description: "Real-time computer vision inference and object tracking.", relatedProjects: ["SightRanger"] },
      { id: "huggingface", name: "Hugging Face", importance: "familiar", description: "Model deployment and transformer pipelines.", relatedProjects: ["Research publication on Generative AI Integration using APIs"] },
      { id: "vision", name: "Computer Vision", importance: "core", description: "Applying visual analysis to real-world systems.", relatedProjects: ["SightRanger"] },
    ],
    usedIn: ["SightRanger", "Research publication on Generative AI Integration using APIs"],
  },
  {
    id: "backend",
    title: "Backend",
    color: "#ff9c3f",
    accent: "orange",
    description: "Designing APIs, services, and scalable backend workflows.",
    skills: [
      { id: "node", name: "Node.js", importance: "core", description: "Building server architectures and microservices.", relatedProjects: ["Punjab National Bank internship", "Transizr"] },
      { id: "fastapi", name: "FastAPI", importance: "strong", description: "High-performance Python API design.", relatedProjects: ["Transizr", "SightRanger"] },
      { id: "express", name: "Express.js", importance: "strong", description: "REST API and middleware systems.", relatedProjects: ["Punjab National Bank internship"] },
      { id: "rest", name: "REST APIs", importance: "core", description: "Reliable API design for modern applications.", relatedProjects: ["Punjab National Bank internship", "Transizr"] },
      { id: "api-design", name: "API Design", importance: "core", description: "Designing clean service contracts and workflows.", relatedProjects: ["Transizr"] },
      { id: "event-driven", name: "Event-Driven Architecture", importance: "strong", description: "Asynchronous systems for scalable workflows.", relatedProjects: ["Transizr"] },
    ],
    usedIn: ["Transizr", "Punjab National Bank internship"],
  },
  {
    id: "frontend",
    title: "Frontend",
    color: "#d45cff",
    accent: "magenta",
    description: "Creating responsive interfaces and real-time product experiences.",
    skills: [
      { id: "react", name: "React", importance: "core", description: "Building polished, component-driven interfaces.", relatedProjects: ["SightRanger", "Transizr"] },
      { id: "next", name: "Next.js", importance: "strong", description: "Server-rendered and hybrid React applications.", relatedProjects: ["SightRanger"] },
      { id: "tailwind", name: "Tailwind CSS", importance: "core", description: "Fast, consistent UI styling for premium layouts.", relatedProjects: ["Transizr", "Portfolio"] },
      { id: "typescript", name: "TypeScript", importance: "core", description: "Typed code that scales across UI and system layers.", relatedProjects: ["SightRanger", "Transizr"] },
      { id: "dashboard", name: "Real-time Dashboards", importance: "strong", description: "Interactive, data-rich interfaces for stakeholders.", relatedProjects: ["Transizr"] },
    ],
    usedIn: ["SightRanger", "Transizr"],
  },
  {
    id: "databases",
    title: "Databases",
    color: "#34ff88",
    accent: "green",
    description: "Working with relational and in-memory systems for storage, caching, and live updates.",
    skills: [
      { id: "postgresql", name: "PostgreSQL", importance: "core", description: "Reliable relational data modeling and analytics.", relatedProjects: ["Punjab National Bank internship"] },
      { id: "mysql", name: "MySQL", importance: "core", description: "Production-grade transactional databases.", relatedProjects: ["Punjab National Bank internship"] },
      { id: "redis", name: "Redis", importance: "strong", description: "Caching and fast data layer design.", relatedProjects: ["Transizr"] },
      { id: "firebase", name: "Firebase", importance: "familiar", description: "Realtime backend and user authentication flows.", relatedProjects: ["Portfolio"] },
    ],
    usedIn: ["Punjab National Bank internship", "Transizr"],
  },
  {
    id: "infra",
    title: "Systems / Infra",
    color: "#b16cff",
    accent: "purple",
    description: "Using containers, queues, distributed workflows, and production-ready infrastructure patterns.",
    skills: [
      { id: "docker", name: "Docker", importance: "core", description: "Containerized deployments and reproducible environments.", relatedProjects: ["Transizr", "SightRanger"] },
      { id: "rabbitmq", name: "RabbitMQ", importance: "strong", description: "Message queues for resilient background workflows.", relatedProjects: ["Transizr"] },
      { id: "celery", name: "Celery", importance: "strong", description: "Task orchestration for scalable async jobs.", relatedProjects: ["Transizr"] },
      { id: "distributed", name: "Distributed Systems", importance: "core", description: "Designing systems that scale across services and teams.", relatedProjects: ["Transizr"] },
      { id: "microservices", name: "Microservices", importance: "strong", description: "Modular service design for flexibility and reliability.", relatedProjects: ["Transizr"] },
      { id: "git", name: "Git / GitHub", importance: "core", description: "Collaborative version control and deployment workflows.", relatedProjects: ["All projects"] },
    ],
    usedIn: ["Transizr", "SightRanger"],
  },
  {
    id: "languages",
    title: "Languages",
    color: "#ff5466",
    accent: "red",
    description: "Core languages I use across backend, frontend, systems, and applied AI work.",
    skills: [
      { id: "python", name: "Python", importance: "core", description: "Primary language for backend, AI, and automation.", relatedProjects: ["SightRanger", "Research publication on Generative AI Integration using APIs"] },
      { id: "javascript", name: "JavaScript", importance: "core", description: "Client-side logic and interactive user experiences.", relatedProjects: ["Portfolio", "Transizr"] },
      { id: "typescript", name: "TypeScript", importance: "core", description: "Typed applications for front-to-back consistency.", relatedProjects: ["Portfolio", "SightRanger"] },
      { id: "go", name: "Go", importance: "strong", description: "Compiled services and efficient backend tooling.", relatedProjects: ["Research publication on Generative AI Integration using APIs"] },
      { id: "java", name: "Java", importance: "familiar", description: "Object-oriented architecture and enterprise integration.", relatedProjects: ["Punjab National Bank internship"] },
      { id: "sql", name: "SQL", importance: "core", description: "Structured queries for analytics and transactional systems.", relatedProjects: ["Punjab National Bank internship"] },
    ],
    usedIn: ["Punjab National Bank internship", "Research publication on Generative AI Integration using APIs"],
  },
];

export const categoryOrder: CategoryId[] = ["ai", "backend", "frontend", "databases", "infra", "languages"];
