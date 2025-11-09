export interface Project {
  slug: string;
  title: string;
  description: string;
  githubUrl: string;
  techStack?: { name: string; url: string }[];
  architecture?: string;
}

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This is the website you are currently viewing. It is a personal portfolio to showcase my projects and skills. It is built with a modern tech stack and is designed to be easily maintainable and scalable.',
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
    githubUrl: 'https://github.com/phingorani/chatbot',
  },
  {
    slug: 'cleansweeper',
    title: 'CleanSweeper',
    description: 'This project is a floor-cleaning robot simulation. It navigates a variety of floor plans, avoids obstacles, and returns to its charging station. The goal of this project was to implement and test pathfinding and navigation algorithms in a simulated environment.',
    githubUrl: 'https://github.com/p-swantek/CleanSweeper',
  },
  {
    slug: 'dangerbot',
    title: 'Dangerbot',
    description: 'This project is a Slack bot that helps teams manage their pull requests. It uses Danger JS to automate code review tasks and provide feedback to developers. The goal of this project was to improve the code review process and increase team productivity.',
    githubUrl: 'https://github.com/phingorani/dangerbot',
  },
];
