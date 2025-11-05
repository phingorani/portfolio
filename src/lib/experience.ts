export interface Experience {
  slug: string;
  company: string;
  location: string;
  title: string;
  date: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    slug: 'hyatt-product-engineer',
    company: 'Hyatt Corporation',
    location: 'Chicago',
    title: 'Senior Product Engineer',
    date: 'Mar 2024 - Current',
    description: [
      'Lead team to implement AI in Events and Rooms booking reservation system to optimize workflow.',
      'Implementing a system that collects a large amount of data using GRPC and graphQL from across the company and aggregates it for a large language model(LLM) Claude 3.5 Haiku to create a personalized proposal document for customers thus saving sales managers hours of work.',
      'Creating a ranking system using a reasoning model with feedback loop that ranks leads received by hotels to prioritize higher value leads increasing revenue by 32%.',
      'Developing an application that allows users to configure multiple applications settings as master controls.',
      'Instrumental in moving VM based applications from physical servers to docker based kubernetes clusters leading to higher uptime and high scalability.',
      'Developing the “Meetings and Events” website on hyatt.com that enables Hyatt to book Events directly, increasing revenue by $5.4M.',
      "Spearheading Hyatt's internal apps division for Sales and Events that commands a global presence.",
      "Redesigning Hyatt's Single Sign On system by integrating it with Azure Entra and implementing Multi Factor Authentication to better secure Hyatt's Software and Hardware infrastructure.",
    ],
  },
  {
    slug: 'jpmorgan-chase',
    company: 'J.P Morgan Chase',
    location: 'Chicago',
    title: 'Senior Software Engineer Ill',
    date: 'Sep 2022 - Mar 2024',
    description: [
      'Implemented easy to reuse common components for payments that can be reused by multiple UI applications.',
      'Key in implementing feature flag driven architecture making apps less complex to maintain and enable dark mode deployments.',
      'Instrumental in implementing routing, compilation and testing using next.js, cypress and jest to create a robust, responsive and easy to understand payments web application(React, Typescript and Next.js).',
      'Designed front end implementation of Symmetric encryption for PCI data.',
      'Created a reusable component to easily navigate multiple applications with minimal amount of dependencies.(React/MUI/Axios/AWS Lambda)',
      'Created Module Federated User Interface design to implement micro front ends enabling more flexibility and reduced complexity of code management.',
    ],
  },
  {
    slug: 'hyatt-full-stack',
    company: 'Hyatt Corporation',
    location: 'Chicago',
    title: 'Full-stack Software Developer',
    date: 'Mar 2019 - Aug 2022',
    description: [
      "Involved in the initiative to upgrade the technology stack for Hyatt's internal management system using AngularJs and SprintBoot",
      'Created CRUD APIs in Spring including server side infinite scroll and architected concurrency for read only database transactions.',
      'Created robust and reusable UI components in angular with fully automated functional tests in UI using protractor and selenium.',
    ],
  },
];
