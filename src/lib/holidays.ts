
export interface Holiday {
  name: string;
  date: Date;
}

export const holidays: Holiday[] = [
  {
    name: 'New Year\'s Day',
    date: new Date(new Date().getFullYear(), 0, 1),
  },
  {
    name: 'Martin Luther King, Jr. Day',
    date: new Date(new Date().getFullYear(), 0, 15),
  },
  {
    name: 'Valentine\'s Day',
    date: new Date(new Date().getFullYear(), 1, 14),
  },
  {
    name: 'Presidents\' Day',
    date: new Date(new Date().getFullYear(), 1, 19),
  },
  {
    name: 'St. Patrick\'s Day',
    date: new Date(new Date().getFullYear(), 2, 17),
  },
  {
    name: 'April Fools\' Day',
    date: new Date(new Date().getFullYear(), 3, 1),
  },
  {
    name: 'Easter',
    date: new Date(new Date().getFullYear(), 3, 20),
  },
  {
    name: 'Mother\'s Day',
    date: new Date(new Date().getFullYear(), 4, 12),
  },
  {
    name: 'Memorial Day',
    date: new Date(new Date().getFullYear(), 4, 26),
  },
  {
    name: 'Father\'s Day',
    date: new Date(new Date().getFullYear(), 5, 15),
  },
  {
    name: 'Independence Day',
    date: new Date(new Date().getFullYear(), 6, 4),
  },
  {
    name: 'Labor Day',
    date: new Date(new Date().getFullYear(), 8, 1),
  },
  {
    name: 'Halloween',
    date: new Date(new Date().getFullYear(), 9, 31),
  },
  {
    name: 'Veterans Day',
    date: new Date(new Date().getFullYear(), 10, 11),
  },
  {
    name: 'Thanksgiving',
    date: new Date(new Date().getFullYear(), 10, 27),
  },
  {
    name: 'Christmas',
    date: new Date(new Date().getFullYear(), 11, 25),
  },
];

