export interface Course {
  name: string;
  title: string;
  url: string;
}

export interface Semester {
  title: string;
  courses: Course[];
}

export interface Education {
  slug: string;
  university: string;
  location: string;
  degree: string;
  date: string;
  url: string;
  description?: string;
  coreCourses?: Course[];
  foundationCourses?: Course[];
  semesters?: Semester[];
}

export const educations: Education[] = [
  {
    slug: 'depaul-university',
    university: 'Depaul University',
    location: 'Chicago',
    degree: 'MS, Computer Science',
    date: '2014 - 2017',
    url: 'https://www.depaul.edu/Pages/default.aspx',
    description: 'My time at DePaul was a deep dive into the world of computer science. I built a strong foundation in the theoretical and practical aspects of the field, with a focus on software development, algorithms, and systems. The program allowed me to explore my interests in various areas of computer science, which have been a huge influence on my career path.',
    coreCourses: [
      { name: 'CSC 400', title: 'DISCRETE STRUCTURES FOR COMPUTER SCIENCE', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC400' },
      { name: 'CSC 401', title: 'INTRODUCTION TO PROGRAMMING', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC401' },
      { name: 'CSC 402', title: 'DATA STRUCTURES I', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC402' },
      { name: 'CSC 403', title: 'DATA STRUCTURES II', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC403' },
      { name: 'CSC 406', title: 'SYSTEMS I', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC406' },
      { name: 'CSC 407', title: 'SYSTEMS II', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC407' },
    ],
    foundationCourses: [
      { name: 'CSC 421', title: 'APPLIED ALGORITHMS AND STRUCTURES', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC421' },
      { name: 'CSC 435', title: 'DISTRIBUTED SYSTEMS I', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC435' },
      { name: 'CSC 447', title: 'CONCEPTS OF PROGRAMMING LANGUAGES', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC447' },
      { name: 'CSC 453', title: 'PRINCIPLES OF DATABASE MANAGEMENT SYSTEMS', url: 'https://catalog.depaul.edu/course-descriptions/csc/#CSC453' },
      { name: 'SE 450', title: 'OBJECT-ORIENTED SOFTWARE DEVELOPMENT', url: 'https://catalog.depaul.edu/course-descriptions/se/#SE450' },
    ],
  },
  {
    slug: 'rd-national',
    university: 'RD National',
    location: 'Mumbai',
    degree: 'BS, Information Technology',
    date: '2009 - 2013',
    url: 'https://www.rdnational.ac.in/',
    description: 'My Bachelor of Science in Information Technology at R.D. National College provided a strong foundation in the core principles of IT. The curriculum covered a wide range of subjects, from programming fundamentals to advanced topics in networking and database management, preparing me for a career in the rapidly evolving tech industry.',
    semesters: [
      {
        title: 'Semester I',
        courses: [
          { name: 'USIT101', title: 'Imperative Programming', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT102', title: 'Digital Electronics', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT103', title: 'Operating Systems', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT104', title: 'Discrete Mathematics', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT105', title: 'Communication Skills', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
      {
        title: 'Semester II',
        courses: [
          { name: 'USIT201', title: 'Object oriented Programming', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT202', title: 'Microprocessor Architecture', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT203', title: 'Web Programming', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT204', title: 'Numerical and Statistical Methods', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT205', title: 'Green Computing', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
      {
        title: 'Semester III',
        courses: [
          { name: 'USIT301', title: 'Python Programming', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT302', title: 'Data Structures', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT303', title: 'Computer Networks', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT304', title: 'Database Management Systems', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT305', title: 'Applied Mathematics', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
      {
        title: 'Semester IV',
        courses: [
          { name: 'USIT401', title: 'Core Java', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT402', title: 'Introduction to Embedded Systems', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT403', title: 'Computer Oriented Statistical Techniques', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT404', title: 'Software Engineering', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT405', title: 'Computer Graphics and Animation', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
      {
        title: 'Semester V',
        courses: [
          { name: 'USIT501', title: 'Software Project Management', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT502', title: 'Internet of Things', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT503', title: 'Advanced Web Programming', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT504', title: 'Artificial Intelligence', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT505', title: 'Linux System Administration', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
      {
        title: 'Semester VI',
        courses: [
          { name: 'USIT601', title: 'Software Quality Assurance', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT602', title: 'Security in Computing', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT603', title: 'Business Intelligence and Analytics', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT604', title: 'Principles of Geographic Information Systems', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
          { name: 'USIT605', title: 'Enterprise Networking', url: 'https://rdnational.ac.in/Docs/depts/science/it/Programme%20Outcomes%20-%20BSc%20IT%20.pdf' },
        ],
      },
    ],
  },
];
