export type BookStatus = 'In Stock' | 'Out of Stock';
export type BookType = 'Book' | 'DVD' | 'CD' | 'Newspaper';
export type BookLanguage = 'English' | 'Turkish' | 'Chinese' | 'Spanish' | 'Arabic';

export interface Book {
  id: string;
  name: string;
  language: BookLanguage;
  department: string;
  class: string;
  type: BookType;
  status: BookStatus;
}

export const LANGUAGES: BookLanguage[] = ['English', 'Turkish', 'Chinese', 'Spanish', 'Arabic'];
export const BOOK_TYPES: BookType[] = ['Book', 'DVD', 'CD', 'Newspaper'];
export const CLASSES = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export const mockBooks: Book[] = [
  { id: 'PRE2309', name: 'Acoustics',     language: 'English', department: 'Science',           class: '10', type: 'Book', status: 'In Stock'     },
  { id: 'PRE2209', name: 'Geometry',      language: 'English', department: 'Science',           class: '8',  type: 'Book', status: 'In Stock'     },
  { id: 'PRE2213', name: 'Games',         language: 'English', department: 'General',           class: '9',  type: 'Book', status: 'In Stock'     },
  { id: 'PRE2143', name: 'Chess',         language: 'English', department: 'General',           class: '7',  type: 'Book', status: 'Out of Stock' },
  { id: 'PRE2009', name: 'Calculus',      language: 'English', department: 'Mathematics',       class: '9',  type: 'Book', status: 'In Stock'     },
  { id: 'PRE2431', name: 'Visual Basic',  language: 'English', department: 'Computer Science',  class: '11', type: 'Book', status: 'Out of Stock' },
  { id: 'PRE1534', name: 'Acoustics',     language: 'English', department: 'Science',           class: '10', type: 'Book', status: 'In Stock'     },
  { id: 'PRE2153', name: 'Robotics',      language: 'English', department: 'Science',           class: '10', type: 'Book', status: 'Out of Stock' },
];
