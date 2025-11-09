export interface Experience {
  slug: string;
  company: string;
  location: string;
  title: string;
  date: string;
  description: { text: string; keyAchievement?: boolean }[];
  icon?: string;
}

export const experiences: Experience[] = [
  {
    slug: 'hyatt-product-engineer',
    company: 'Hyatt Corporation',
    location: 'Chicago',
    title: 'Senior Product Engineer',
    date: 'Mar 2024 - Current',
    description: [
      { text: 'Lead team to implement AI in Events and Rooms booking reservation system to optimize workflow.', keyAchievement: true },
      { text: 'Implementing a system that collects a large amount of data using GRPC and graphQL from across the company and aggregates it for a large language model(LLM) Claude 3.5 Haiku to create a personalized proposal document for customers thus saving sales managers hours of work.' },
      { text: 'Creating a ranking system using a reasoning model with feedback loop that ranks leads received by hotels to prioritize higher value leads increasing revenue by 32%.' },
      { text: 'Developing an application that allows users to configure multiple applications settings as master controls.' },
      { text: 'Instrumental in moving VM based applications from physical servers to docker based kubernetes clusters leading to higher uptime and high scalability.' },
      { text: 'Developing the “Meetings and Events” website on hyatt.com that enables Hyatt to book Events directly, increasing revenue by $5.4M.' },
      { text: "Spearheading Hyatt's internal apps division for Sales and Events that commands a global presence." },
      { text: "Redesigning Hyatt's Single Sign On system by integrating it with Azure Entra and implementing Multi Factor Authentication to better secure Hyatt's Software and Hardware infrastructure." },
    ],
    icon: 'hyatt',
  },
  {
    slug: 'jpmorgan-chase',
    company: 'J.P Morgan Chase',
    location: 'Chicago',
    title: 'Senior Software Engineer Ill',
    date: 'Sep 2022 - Mar 2024',
    description: [
      { text: 'Implemented easy to reuse common components for payments that can be reused by multiple UI applications.', keyAchievement: true },
      { text: 'Key in implementing feature flag driven architecture making apps less complex to maintain and enable dark mode deployments.' },
      { text: 'Instrumental in implementing routing, compilation and testing using next.js, cypress and jest to create a robust, responsive and easy to understand payments web application(React, Typescript and Next.js).' },
      { text: 'Designed front end implementation of Symmetric encryption for PCI data.' },
      { text: 'Created a reusable component to easily navigate multiple applications with minimal amount of dependencies.(React/MUI/Axios/AWS Lambda)' },
      { text: 'Created Module Federated User Interface design to implement micro front ends enabling more flexibility and reduced complexity of a code management.' },
    ],
    icon: 'jpmorgan',
  },
  {
    slug: 'hyatt-full-stack',
    company: 'Hyatt Corporation',
    location: 'Chicago',
    title: 'Full-stack Software Developer',
    date: 'Mar 2019 - Aug 2022',
    description: [
      { text: "Involved in the initiative to upgrade the technology stack for Hyatt's internal management system using AngularJs and SprintBoot", keyAchievement: true },
      { text: 'Created CRUD APIs in Spring including server side infinite scroll and architected concurrency for read only database transactions.' },
      { text: 'Created robust and reusable UI components in angular with fully automated functional tests in UI using protractor and selenium.' },
    ],
    icon: 'hyatt',
  },
];
