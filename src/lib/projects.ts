export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  githubUrl: string;
  techStack?: { name: string; url: string }[];
  architecture?: string;
}

export const projects: Project[] = [
  {
    slug: 'image-recognition',
    title: 'Image Captioning',
    description: 'An image captioning application that uses a pre-trained model to generate descriptive captions for images. The user can upload an image or provide an image URL, and the application will generate a caption for it. The application also includes a feedback mechanism to collect user ratings and comments, which are stored in a CSV file for future analysis.',
    shortDescription: 'An image captioning application using a pre-trained BLIP model.',
    githubUrl: 'https://github.com/phingorani/image-recognition',
    techStack: [
      { name: 'Streamlit', url: 'https://streamlit.io/' },
      { name: 'Pandas', url: 'https://pandas.pydata.org/' },
      { name: 'Pillow', url: 'https://python-pillow.org/' },
      { name: 'Transformers', url: 'https://huggingface.co/docs/transformers/index' },
      { name: 'PyTorch', url: 'https://pytorch.org/' },
      { name: 'Requests', url: 'https://requests.readthedocs.io/en/latest/' },
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This is the website you are currently viewing. It is a personal portfolio to showcase my projects and skills. It is built with a modern tech stack and is designed to be easily maintainable and scalable.',
    shortDescription: 'The very website you are on now, built with Next.js and Material-UI.',
    githubUrl: 'https://github.com/phingorani/portfolio',
    techStack: [
      { name: 'Next.js', url: 'https://nextjs.org/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'Material-UI', url: 'https://mui.com/' },
      { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
      { name: 'Vercel', url: 'https://vercel.com/' },
    ],
    architecture: 'This website is built with the Next.js App Router, which allows for a hybrid approach of server-side rendering (SSR) and client-side rendering (CSR). The majority of the site is statically generated for performance, with dynamic capabilities for features like the theme toggle. The site is hosted on Vercel, which provides a seamless deployment experience and global CDN.',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI-Powered Chatbot',
    description: 'This project is an intelligent chatbot built with modern AI technologies. It can understand and respond to user queries in a conversational manner. The goal of this project was to explore the capabilities of large language models and apply them to a real-world application.',
    shortDescription: 'An intelligent, conversational chatbot using Python and Gemini.',
    githubUrl: 'https://github.com/phingorani/chatbot',
    techStack: [
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'Streamlit', url: 'https://streamlit.io/' },
      { name: 'LangChain', url: 'https://www.langchain.com/' },
      { name: 'Gemini', url: 'https://deepmind.google/technologies/gemini/' },
    ],
  },
  {
    slug: 'cleansweeper',
    title: 'CleanSweeper',
    description: 'This project is a floor-cleaning robot simulation. It navigates a variety of floor plans, avoids obstacles, and returns to its charging station. The goal of this project was to implement and test pathfinding and navigation algorithms in a simulated environment.',
    shortDescription: 'A Java-based simulation of a floor-cleaning robot with pathfinding AI.',
    githubUrl: 'https://github.com/p-swantek/CleanSweeper',
    techStack: [
      { name: 'Java', url: 'https://www.java.com/' },
      { name: 'JUnit', url: 'https://junit.org/' },
    ],
  },
  {
    slug: 'dangerbot',
    title: 'Dangerbot',
    description: 'This project is a Discord bot that helps moderate servers and automate tasks. It is built with Java and the Javacord library, and uses the Spring Framework for dependency injection and application structure.',
    shortDescription: 'A Discord bot for server moderation, built with Java and Spring.',
    githubUrl: 'https://github.com/phingorani/dangerbot',
    techStack: [
      { name: 'Java', url: 'https://www.java.com/' },
      { name: 'Javacord', url: 'https://javacord.org/' },
      { name: 'Spring Framework', url: 'https://spring.io/' },
    ],
  },
];
