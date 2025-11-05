export interface Education {
  slug: string;
  university: string;
  location: string;
  degree: string;
  date: string;
}

export const educations: Education[] = [
  {
    slug: 'depaul-university',
    university: 'Depaul University',
    location: 'Chicago',
    degree: 'MS, Computer Science',
    date: '2014 - 2017',
  },
  {
    slug: 'rd-national',
    university: 'RD National',
    location: 'Mumbai',
    degree: 'BS, Information Technology',
    date: '2009 - 2013',
  },
];
