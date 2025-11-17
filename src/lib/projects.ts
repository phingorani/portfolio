export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  githubUrl: string;
  techStack?: { name: string; url: string }[];
  architecture?: string;
  readmeUrl?: string;
  // New optional fields to align with sectioned project detail page
  // These are redundant with existing fields but make the data model explicit.
  objective?: string;          // maps to "Objective" section (defaults to shortDescription)
  overview?: string;           // maps to "Project Overview" (defaults to description)
  process?: string;            // maps to "Process"
  /**
   * New preferred fields: a concise short value proposition (collapsed view)
   * and an optional long value proposition (expanded view).
   */
  shortValueProposition?: string;
  longValueProposition?: string;
  reflection?: string;         // maps to "Reflection"
  evidenceText?: string;       // maps to "Evidence" (text content shown above README/images)
  evidenceImages?: {           // optional extra evidence beyond README (local images, diagrams)
    src: string;
    alt?: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: 'image-vectorizer',
    title: 'Image Vectorizer',
    description: 'This project offers a comprehensive solution for image vectorization and analysis. It efficiently processes images, extracting key features using advanced deep learning models (PyTorch, Transformers). These high-dimensional vectors are then stored in a PostgreSQL database, leveraging the `pgvector` extension for optimized similarity search and retrieval, as depicted in the "Postgres Screenshot" showing vector data storage.',
    shortDescription: 'A tool to vectorize images and visualize them in a 3D chart.',
    githubUrl: 'https://github.com/phingorani/image-vectorizer',
    readmeUrl: 'https://raw.githubusercontent.com/phingorani/image-vectorizer/main/README.md',
    techStack: [
      { name: 'psycopg2-binary', url: 'https://pypi.org/project/psycopg2-binary/' },
      { name: 'pgvector', url: 'https://pypi.org/project/pgvector/' },
      { name: 'Pillow', url: 'https://python-pillow.org/' },
      { name: 'PyTorch', url: 'https://pytorch.org/' },
      { name: 'torchvision', url: 'https://pytorch.org/vision/stable/index.html' },
      { name: 'Transformers', url: 'https://huggingface.co/docs/transformers/index' },
      { name: 'Flask', url: 'https://flask.palletsprojects.com/' },
      { name: 'watchdog', url: 'https://pypi.org/project/watchdog/' },
      { name: 'scikit-learn', url: 'https://scikit-learn.org/' },
    ],
    // New explicit section fields (populated from existing data)
    objective: 'Want your LLMs to always remember? Vectorization is for you! Train once and ALWAYS remember',
    overview: 'This project offers a comprehensive solution for image vectorization and analysis. It efficiently processes images, extracting key features using advanced deep learning models (PyTorch, Transformers). These high-dimensional vectors are then stored in a PostgreSQL database, leveraging the `pgvector` extension for optimized similarity search and retrieval, as depicted in the "Postgres Screenshot" showing vector data storage. The "Demo Screenshot" illustrates the interactive 3D visualization of this vectorized data, where the vector points are plotted to highlight the three dimensions with the highest variance, providing intuitive insights into the dataset\'s underlying structure and relationships. A Flask API orchestrates image uploads, vectorization, and data querying, complemented by a Watchdog-based file system monitor for automated processing of new image inputs. This system transforms raw image data into an analyzable and searchable format, demonstrating a full pipeline from ingestion to insightful visualization.\n\n![Demo Screenshot](/image_vectroizer_demo.png)\n\n![Postgres Screenshot](/image_vectorizer_postgres.png)',
    shortValueProposition:
      'Through this project I demonstrate complete end to end technical skills and have a constant need to improve and enhance projects I work on both professionally and personally. Through the implementation of vector DBs I have ensured all future models have data to train and demonstrated long term vision and thinking.',
    longValueProposition:
      '#### Reflection\n\n- **Customization for the Audience:** I recognized that raw vector data is abstract, so I tailored the visualization layer to the audience. By rendering high-variance datapoints visually, I made the model\'s behavior intuitive for non-technical stakeholders.\n\n- **Lessons Learned:** I gained significant insight into vectorization and how Neural Networks represent data within their hidden layers.\n\n- **Feedback and Revisions:** Actively seeking feedback, I refined the project presentation. Based on this input, I integrated a 3D interactive chart (included in this artifact) to better illustrate the data clusters.',
    process: 'Upload → Vectorize (DL models) → Store (Postgres + pgvector) → Query/Visualize (3D). Detailed steps in README.',
    reflection: 'Future work: batch processing, more backbones for embeddings, and WebGL-based interactive filtering.',
    evidenceText: 'The "Demo Screenshot" illustrates the interactive 3D visualization of this vectorized data, where the vector points are plotted to highlight the three dimensions with the highest variance, providing intuitive insights into the dataset\'s underlying structure and relationships. A Flask API orchestrates image uploads, vectorization, and data querying, complemented by a Watchdog-based file system monitor for automated processing of new image inputs. This system transforms raw image data into an analyzable and searchable format, demonstrating a full pipeline from ingestion to insightful visualization.\n\n![Demo Screenshot](/image_vectroizer_demo.png)\n\n![Postgres Screenshot](/image_vectorizer_postgres.png)',
      evidenceImages: [
      { src: '/image_vectroizer_demo.png', alt: 'Image Vectorizer Demo 3D visualization' },
      { src: '/image_vectorizer_postgres.png', alt: 'PostgreSQL pgvector screenshot' },
    ],
  },
  {
    slug: 'image-description-generator',
    title: 'Image Description Generator',
    description: 'This project is a web-based application that uses a deep learning model to automatically generate descriptions for images.\n\n' +
        'Built with Python and Streamlit, the application allows users to upload an image and receive a text description generated by the BLIP (Bootstrapping Language-Image Pre-training) model from the Hugging Face Transformers library.\n \n \n' +
        'A key feature of this project is its feedback loop. Users can submit corrections if the model\'s description is inaccurate. This feedback is collected and can be used to fine-tune the model, progressively improving its accuracy. \n \n \n' +
        'The application demonstrates a complete cycle of model inference, user feedback, and retraining, showcasing a practical approach to improving machine learning models with user input.',
    shortDescription: 'An image description generator application using a pre-trained BLIP model.',
    githubUrl: 'https://github.com/phingorani/image-recognition',
    readmeUrl: 'https://raw.githubusercontent.com/phingorani/image-recognition/main/README.md',
    techStack: [
      { name: 'Streamlit', url: 'https://streamlit.io/' },
      { name: 'Pandas', url: 'https://pandas.pydata.org/' },
      { name: 'Pillow', url: 'https://python-pillow.org/' },
      { name: 'Transformers', url: 'https://huggingface.co/docs/transformers/index' },
      { name: 'PyTorch', url: 'https://pytorch.org/' },
      { name: 'Requests', url: 'https://requests.readthedocs.io/en/latest/' },
    ],
    objective: 'An image description generator application using a pre-trained BLIP model.',
    overview: 'This project is a web-based application that uses a deep learning model to automatically generate descriptions for images.\n\nBuilt with Python and Streamlit, the application allows users to upload an image and receive a text description generated by the BLIP (Bootstrapping Language-Image Pre-training) model from the Hugging Face Transformers library.\n \n \nA key feature of this project is its feedback loop. Users can submit corrections if the model\'s description is inaccurate. This feedback is collected and can be used to fine-tune the model, progressively improving its accuracy. \n \n \nThe application demonstrates a complete cycle of model inference, user feedback, and retraining, showcasing a practical approach to improving machine learning models with user input.',
    // Migrate to new preferred fields while keeping old ones for compatibility
    shortValueProposition: 'Quickly built a practical BLIP-powered tool to caption a 400GB photo library, with a feedback loop and optional Gemini integration to improve accuracy.',
    longValueProposition: 'This artifact show cases my abilities to identify problems and use my experience to my advantage to overcome those problems. While coming up with use cases for DeepLearning, I Identified the issue of searching through 400 GB of images to find what I\'m looking for. I was able to solution an artifact to help with this issue. From learnings about transfer learning and reinforcement learning I was able to deploy my own model that has the option of plugging in Gemini to teach my model to describe all 400gb of my images or teach the model myself when it needs to be corrected. Thus I was able to demonstrate quick learning about ML and DL concepts as well as put it to practical use showing resourcefulness. ',
    process: 'Upload image → Inference (BLIP) → Show caption → Collect user feedback → Persist → Optional fine-tuning/retraining. See README for details.',
    reflection: 'Planned: batch captioning, multilingual support, and automated evaluation metrics (BLEU/CIDEr).',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This is the website you are currently viewing. It is a personal portfolio to showcase my projects and skills. It is built with a modern tech stack and is designed to be easily maintainable and scalable.',
    shortDescription: 'The very website you are on now, built with Next.js and Material-UI.',
    githubUrl: 'https://github.com/phingorani/portfolio',
    readmeUrl: 'https://raw.githubusercontent.com/phingorani/portfolio/master/README.md',
    techStack: [
      { name: 'Next.js', url: 'https://nextjs.org/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'Material-UI', url: 'https://mui.com/' },
      { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
      { name: 'Vercel', url: 'https://vercel.com/' },
    ],
    architecture: 'This website is built with the Next.js App Router, which allows for a hybrid approach of server-side rendering (SSR) and client-side rendering (CSR). The majority of the site is statically generated for performance, with dynamic capabilities for features like the theme toggle. The site is hosted on Vercel, which provides a seamless deployment experience and global CDN.',
    objective: 'The very website you are on now, built with Next.js and Material-UI.',
    overview: 'This is the website you are currently viewing. It is a personal portfolio to showcase my projects and skills. It is built with a modern tech stack and is designed to be easily maintainable and scalable.',
    shortValueProposition: 'A modern, performant portfolio built with Next.js App Router and MUI, deployed on Vercel for seamless global delivery.',
    process: 'Plan content → Build with Next.js + MUI → Animate with Framer Motion → Deploy on Vercel → Iterate.',
    reflection: 'Next steps: richer content, SEO adjustments, and adding integration tests for core flows.',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI-Powered Chatbot',
    description: 'This project is an intelligent chatbot built with modern AI technologies. It can understand and respond to user queries in a conversational manner. The goal of this project was to explore the capabilities of large language models and apply them to a real-world application.',
    shortDescription: 'An intelligent, conversational chatbot using Python and Gemini.',
    githubUrl: 'https://github.com/phingorani/chatbot',
    readmeUrl: 'https://raw.githubusercontent.com/phingorani/chatbot/main/README.md',
    techStack: [
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'Streamlit', url: 'https://streamlit.io/' },
      { name: 'LangChain', url: 'https://www.langchain.com/' },
      { name: 'Gemini', url: 'https://deepmind.google/technologies/gemini/' },
    ],
    objective: 'An intelligent, conversational chatbot using Python and Gemini.',
    overview: 'This project is an intelligent chatbot built with modern AI technologies. It can understand and respond to user queries in a conversational manner. The goal of this project was to explore the capabilities of large language models and apply them to a real-world application.',
    shortValueProposition: 'Demonstrates an LLM-powered conversational UI with a lightweight Streamlit deployment.',
    process: 'Design prompts/flows → Implement Streamlit UI → Integrate model via LangChain → Deploy demo → Collect feedback.',
    reflection: 'Improvements: better session memory, tool use, and guardrails for safer outputs.',
  },
  {
    slug: 'cleansweeper',
    title: 'CleanSweeper',
    description: 'This project is a floor-cleaning robot simulation. It navigates a variety of floor plans, avoids obstacles, and returns to its charging station. The goal of this project was to implement and test pathfinding and navigation algorithms in a simulated environment.',
    shortDescription: 'A Java-based simulation of a floor-cleaning robot with pathfinding AI.',
    githubUrl: 'https://github.com/p-swantek/CleanSweeper',
    readmeUrl: 'https://raw.githubusercontent.com/p-swantek/CleanSweeper/master/README.md',
    techStack: [
      { name: 'Java', url: 'https://www.java.com/' },
      { name: 'JUnit', url: 'https://junit.org/' },
    ],
    objective: 'A Java-based simulation of a floor-cleaning robot with pathfinding AI.',
    overview: 'This project is a floor-cleaning robot simulation. It navigates a variety of floor plans, avoids obstacles, and returns to its charging station. The goal of this project was to implement and test pathfinding and navigation algorithms in a simulated environment.',
    shortValueProposition: 'Applies classical pathfinding algorithms under realistic constraints in a robotics simulation.',
    process: 'Model environment → Implement navigation/pathfinding → Simulate runs → Validate behavior with tests.',
    reflection: 'Potential: integrate SLAM elements and stochastic obstacles for robustness.',
  },
  {
    slug: 'dangerbot',
    title: 'Dangerbot',
    description: 'This project is a Discord bot that helps moderate servers and automate tasks. It is built with Java and the Javacord library, and uses the Spring Framework for dependency injection and application structure.',
    shortDescription: 'A Discord bot for server moderation, built with Java and Spring.',
    githubUrl: 'https://github.com/phingorani/dangerbot',
    readmeUrl: 'https://raw.githubusercontent.com/phingorani/dangerbot/develop/README.md',
    techStack: [
      { name: 'Java', url: 'https://www.java.com/' },
      { name: 'Javacord', url: 'https://javacord.org/' },
      { name: 'Spring Framework', url: 'https://spring.io/' },
    ],
    objective: 'A Discord bot for server moderation, built with Java and Spring.',
    overview: 'This project is a Discord bot that helps moderate servers and automate tasks. It is built with Java and the Javacord library, and uses the Spring Framework for dependency injection and application structure.',
    shortValueProposition: 'Automates moderation workflows with an extensible command framework for Discord.',
    process: 'Define moderation features → Implement bot with Javacord → Structure with Spring → Iterate features.',
    reflection: 'Future: plugin system and permission scopes to customize per server.',
  },
];
