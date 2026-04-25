// Keep this purely as data so it's easy to reuse/test
const projects = [
  {
    title: "SightRanger",
    company: "AI-Powered Smart Surveillance System",
    duration: "2026",
    views: "4.1K",
    thumbnail: "/images/SightRanger.png",
    description:
      "Built an intelligent real-time surveillance platform using FastAPI, YOLOv8, and Next.js that monitors webcam or mobile video streams, detects human intrusions, and sends instant email alerts with captured evidence. Designed modular backend and frontend services with bulk video processing and Docker-based deployment for scalable monitoring workflows.",
    tags: ["FastAPI", "YOLOv8", "Next.js", "Tailwind", "Docker"],
  },
  {
    title: "CodeBundle",
    company: "CLI Tool for AI-Ready Codebase Export",
    duration: "2026",
    views: "3.2K",
    thumbnail: "/images/CodeBundle.png",
    description:
      "Created a lightweight Go CLI that bundles an entire directory into a single structured text file for AI tools, code reviews, and project snapshots. Added recursive file collection, tree-style structure output, fast mode for large repositories, and a zero-config developer experience optimized for sharing full codebases with LLMs.",
    tags: ["Go", "CLI", "Developer Tools", "LLM Workflow", "Automation"],
  },
  {
    title: "Transizr",
    company: "AI-Powered Media Transcription Platform",
    duration: "2026",
    views: "4.6K",
    thumbnail: "/images/Transizr.png",
    description:
      "Developed a distributed transcription system for audio and video processing with FastAPI, Celery, RabbitMQ, Redis, and containerized workers. Implemented scalable task execution, media optimization, and real-time status updates through Redis Pub-Sub and Server-Sent Events to support reliable high-volume transcription workloads.",
    tags: ["FastAPI", "Celery", "RabbitMQ", "Redis", "Docker"],
  },
  {
    title: "Artsy Platform – Web App",
    company: "USC Web Development Project",
    duration: "2025",
    views: "3.8K",
    thumbnail: "/images/artsy.png",
    description:
      "Developed a scalable full-stack web application using Angular and Node.js, integrating third-party APIs (Artsy) to deliver real-time artist search, artwork insights, and similarity-based discovery. Implemented secure authentication (JWT), state management, and a personalized favorites system using MongoDB, with a responsive and component-driven frontend architecture.",
    tags: ["Angular", "Node.js", "MongoDB", "JWT Auth", "Artsy API"],
  },
  {
    title: "Artsy Platform – Android App",
    company: "USC Mobile Development Project",
    duration: "2025",
    views: "3.6K",
    thumbnail: "/images/artsy.png",
    description:
      "Developed a scalable Android application using Kotlin and Jetpack Compose, leveraging REST APIs (Artsy) for real-time artist discovery, artwork insights, and similarity-based exploration. Implemented MVVM architecture, asynchronous data handling with coroutines, and a personalized favorites system with persistent user sessions.",
    tags: ["Kotlin", "Jetpack Compose", "MVVM", "Coroutines", "Artsy API"],
  },
  {
    title: "Morph Runner",
    company: "USC Game Development Project",
    duration: "2025",
    views: "5K",
    thumbnail: "/images/morph-runner.png",
    description:
      "Built a Unity 3D runner game integrated with Python + Firebase analytics. Designed player-performance visualizations and GPT-powered dashboards to deliver intelligent gameplay insights and testing feedback.",
    tags: ["Unity", "C#", "Firebase", "Python", "Analytics"],
  },
  {
    title: "Apple Website Clone",
    company: "Frontend Clone Series",
    duration: "2024",
    views: "2.9K",
    thumbnail: "/images/apple-clone.png",
    description:
      "Recreated Apple’s product showcase experience using React, GSAP, and Three.js with interactive 3D transitions. Used RunwayML and Hugging Face diffusion models for automated asset generation and motion sequences.",
    tags: ["React", "Three.js", "GSAP", "RunwayML", "Hugging Face"],
  },
  {
    title: "J.A.R.V.I.S Virtual Assistant",
    company: "Personal Project",
    duration: "2024",
    views: "2.3K",
    thumbnail: "/images/jarvis.png",
    description:
      "Engineered a GPT-powered virtual assistant capable of automation, speech recognition, and contextual conversation. Integrated TTS, web scraping, and AI-generated daily cyber briefings.",
    tags: ["Python", "GPT-3", "SpeechRecognition", "Automation", "NLP"],
  },
  {
    title: "Taxi Demand Prediction",
    company: "Personal Project",
    duration: "2023",
    views: "3.4K",
    thumbnail: "/images/taxi-demand.png",
    description:
      "Developed predictive LSTM and ARIMA models for NYC taxi demand forecasting. Automated EDA, feature extraction, and GPT-driven anomaly commentary for data storytelling.",
    tags: ["Python", "LSTM", "ARIMA", "Dask", "AI Analytics"],
  },
  {
    title: "Malaria Detection using Deep Learning",
    company: "Research Project",
    duration: "2023",
    views: "3K",
    thumbnail: "/images/malaria.png",
    description:
      "Built a CNN-based model for early malaria detection using transfer learning (ResNet, EfficientNet) via Hugging Face + TensorFlow Hub. Deployed on Streamlit with Grad-CAM explainability for diagnostic insights.",
    tags: ["TensorFlow", "Keras", "Streamlit", "Hugging Face", "CNN"],
  },
  {
    title: "Chatbot Template (NLP)",
    company: "Streamlit Prototype",
    duration: "2023",
    views: "1.5K",
    thumbnail: "/images/chatbot.png",
    description:
      "Designed a lightweight chatbot using Hugging Face transformers and custom-trained intent recognizers. Deployed via Streamlit with sentiment-aware contextual responses.",
    tags: ["Python", "Streamlit", "NLP", "Hugging Face", "Chatbot"],
  },
  {
    title: "Invoice Generator Platform",
    company: "Personal Project",
    duration: "2022",
    views: "2.5K",
    thumbnail: "/images/invoice.png",
    description:
      "Developed a scalable full-stack invoicing platform using React, TypeScript, and Node.js, featuring secure JWT-based authentication, dynamic invoice creation with real-time GST calculations, and automated PDF generation via Puppeteer. Designed RESTful APIs with MongoDB for efficient data management and retrieval.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Puppeteer"],
  },
  {
    title: "Sales Analysis Dashboard",
    company: "Personal Project",
    duration: "2022",
    views: "2K",
    thumbnail: "/images/sales-dashboard.png",
    description:
      "Developed a data analysis pipeline using Python, Pandas, and Matplotlib to process and visualize sales data, enabling insights into trends, product performance, and customer behavior through structured exploratory analysis.",
    tags: ["Python", "Pandas", "Matplotlib", "EDA", "Data Analysis"],
  },
  {
    title: "Music Store Analytics",
    company: "PostgreSQL Case Study",
    duration: "2021",
    views: "1.8K",
    thumbnail: "/images/music-store.png",
    description:
      "Designed complex SQL queries using joins, CTEs, and window functions to analyze a digital music store dataset, uncovering insights into customer purchasing behavior, genre trends, and revenue distribution.",
    tags: ["PostgreSQL", "SQL", "CTEs", "Window Functions", "Data Analysis"],
  },
];

export default projects;
