const profile = {
  name: 'Manit Dankhara',
  title: 'Computer Science Student • Backend & AI Developer',
  summary:
    'Computer Science student at the University of Texas at Arlington with hands-on experience building secure, testable backend systems, data pipelines, and mobile applications. Seeking a Back-End Software Engineering Internship to build scalable, reliable, and secure distributed systems.',
  location: 'Arlington, TX',
  availability: 'Open for internships, full-time roles, and collaborations',
  phone: '(682) 509-1460',
  email: 'manitdankhara007@gmail.com',
  avatarUrl: `${process.env.PUBLIC_URL}/PHOTO.jpeg`,
  githubUsername: 'manit0700',
  githubUrl: 'https://github.com/manit0700',
  linkedInUrl: 'https://www.linkedin.com/in/your-linkedin',
  education: [
    {
      school: 'University of Texas at Arlington',
      degree: 'B.S., Computer Science',
      year: '2026',
    },
  ],
  experience: [
    {
      org: 'University of Texas at Arlington',
      role: 'Resident Assistant, University Housing',
      dates: '2025 - Present',
      bullets: [
        'Mentored and supported a community of 30+ residents by planning programs, mediating conflicts, and ensuring policy compliance to enhance community living standards and safety.',
        'Coordinated with housing staff and campus resources in a collaborative team environment, maintaining accurate, on-time incident reports.',
      ],
    },
  ],
  projects: [
    {
      title: 'AI Stock Analysis & Portfolio Builder',
      date: 'Jul 2025',
      tags: ['Python', 'React', 'ML'],
      repo: 'https://github.com/manit0700/ai-stock-analysis-portfolio',
      summary: 'Stock analysis + backtesting pipeline with automated reporting.',
      bullets: [
        'Built a research tool that ingests real-time and historical market data via a market data API, cleans it, and computes features (returns, rolling stats, momentum signals).',
        'Implemented a config-driven backtesting engine to compare multiple strategies on multi-year OHLCV data with risk metrics (Sharpe, max drawdown, volatility).',
        'Automated the pipeline (ingest → feature gen → backtest → report) and produced PDF summaries/plots for faster decision-making.',
        'Structured the codebase with modular components (data, indicators, strategies, reporting) and robust error handling/logging.',
      ],
    },
    {
      title: 'Image-to-Text Converter (OCR Mobile App)',
      date: 'Mar 2025',
      tags: ['Flutter', 'OCR', 'Dart'],
      repo: 'https://github.com/manit0700/Image-to-Text-Converter',
      summary: 'Offline OCR app for converting images into editable text.',
      bullets: [
        'Built an offline mobile app that converts photos of receipts/notes into selectable, shareable text with no network required.',
        'Improved recognition using preprocessing (grayscale, denoising, thresholding) and perspective correction for skewed images.',
        'Designed a two-tap export flow (TXT/PDF/share sheet) and packaged the OCR pipeline as a reusable Flutter widget with unit tests for preprocessing steps.',
      ],
    },
    {
      title: 'Fusion AI Multi-Source Intelligent Assistant using LLaMA and RAG',
      date: 'Jan 2026',
      tags: ['Python', 'Flask', 'RAG', 'Docker'],
      repo: 'https://github.com/manit0700/Fusion-ai-',
      summary: 'RAG-based AI assistant with Flask UI and Docker deployment.',
      bullets: [
        'Built an AI-powered assistant using the LLaMA 3.3-70B model with a Retrieval-Augmented Generation pipeline to fetch and synthesize responses from weather APIs and structured databases.',
        'Developed a user-facing web application using Flask, HTML, and CSS for real-time natural language interactions with multi-source data.',
        'Containerized the application using Docker to support consistent environments, scalable deployment, and streamlined development workflows.',
      ],
    },
  ],
  skills: {
    languages: ['Python', 'C', 'C++', 'Java', 'Dart', 'JavaScript', 'SQL', 'Swift'],
    frameworks: [
      'Flask',
      'FastAPI',
      'React',
      'Flutter',
      'Pandas',
      'NumPy',
      'scikit-learn',
      'OpenCV',
      'TensorFlow',
      'Postman',
      'Security Testing',
    ],
    databasesCloud: [
      'MySQL',
      'SQL Server',
      'SQLite',
      'REST APIs',
      'Git/GitHub',
      'Kubernetes',
      'RESTful services',
      'Azure',
    ],
    tools: ['VS Code', 'Jupyter', 'Postman', 'Unix/Linux', 'Docker'],
    professional: ['Software Development', 'Performance Optimization', 'Secure Coding', 'Debugging'],
  },
  activities: [
    {
      org: 'University of Texas at Arlington',
      dates: 'Aug 2023 - May 2024',
      bullets: [
        'Member, UT Arlington Computer Science Club',
        'Volunteer Tutor: Python & C++',
        'Sports: Basketball & Swimming',
      ],
    },
  ],
};

export default profile;
