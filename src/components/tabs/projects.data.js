// Keep this purely as data so it's easy to reuse/test
const projects = [
  {
    title: "Artsy Platform – Web & Android",
    company: "USC Web Development Project",
    duration: "2025",
    views: "3.8K",
    thumbnail: "/images/artsy.png",
    description:
      "Developed a dual-platform art-sharing ecosystem featuring an Android app (Kotlin + Firebase) and a web version (Angular + Node.js). Enabled creators to upload, explore, and recommend digital artworks. Integrated Hugging Face image models for art-style classification, AI-based tag generation, and personalized recommendations. Designed scalable APIs, responsive routing, and seamless synchronization across web and mobile clients.",
    tags: [
      "Kotlin",
      "Angular",
      "Node.js",
      "Firebase",
      "Hugging Face",
      "AI Recommendations",
    ],
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
      "Developed a secure full-stack invoicing app with React + TypeScript frontend and Node.js backend. Integrated AI-based OCR validation using Tesseract and OpenAI embeddings for smart invoice summaries.",
    tags: ["React", "Node.js", "TypeScript", "OCR", "AI Embeddings"],
  },
  {
    title: "Sales Analysis Dashboard",
    company: "Personal Project",
    duration: "2022",
    views: "2K",
    thumbnail: "/images/sales-dashboard.png",
    description:
      "Created an AI-powered analytics dashboard that visualizes sales data, auto-generates GPT-based summaries, and detects anomalies across multiple KPIs using data pipelines built in Python.",
    tags: ["Python", "Pandas", "Matplotlib", "OpenAI API", "EDA"],
  },
  {
    title: "Music Store Analytics",
    company: "PostgreSQL Case Study",
    duration: "2021",
    views: "1.8K",
    thumbnail: "/images/music-store.png",
    description:
      "Performed deep SQL analytics on a digital music store dataset using joins, CTEs, and window functions. Summarized user and genre trends via GPT-enhanced reporting in Streamlit dashboards.",
    tags: ["PostgreSQL", "SQL", "Streamlit", "OpenAI API", "Data Analytics"],
  },
];

export default projects;
