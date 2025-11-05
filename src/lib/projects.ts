export interface Project {
  slug: string;
  title: string;
  description: string;
  githubUrl: string;
}

export const projects: Project[] = [
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
