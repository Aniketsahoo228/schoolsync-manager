export type BookStatus = "Available" | "Out of Stock";
export type BookCategory = "Picture Book" | "Story Book" | "Novel" | "Educational" | "Reference";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: BookCategory;
  publisher: string;
  publishedYear: number;
  quantity: number;
  available: number;
  status: BookStatus;
  description: string;
}

export const mockBooks: Book[] = [
  {
    id: "BK-001",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    isbn: "978-0-399-22690-6",
    category: "Picture Book",
    publisher: "Philomel Books",
    publishedYear: 1969,
    quantity: 8,
    available: 5,
    status: "Available",
    description: "A classic children's picture book that follows a caterpillar eating through various foods before becoming a butterfly.",
  },
  {
    id: "BK-002",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    isbn: "978-0-060-25492-6",
    category: "Story Book",
    publisher: "HarperCollins",
    publishedYear: 1963,
    quantity: 6,
    available: 2,
    status: "Available",
    description: "Max, sent to bed without supper, sails to a land of wild monsters who make him their king.",
  },
  {
    id: "BK-003",
    title: "Green Eggs and Ham",
    author: "Dr. Seuss",
    isbn: "978-0-394-80016-9",
    category: "Story Book",
    publisher: "Random House",
    publishedYear: 1960,
    quantity: 10,
    available: 0,
    status: "Out of Stock",
    description: "Sam-I-Am tries to convince the narrator to try green eggs and ham in various places.",
  },
  {
    id: "BK-004",
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    isbn: "978-0-060-20765-6",
    category: "Picture Book",
    publisher: "HarperCollins",
    publishedYear: 1947,
    quantity: 5,
    available: 5,
    status: "Available",
    description: "A beloved bedtime classic that says goodnight to everything in the great green room.",
  },
  {
    id: "BK-005",
    title: "Charlotte's Web",
    author: "E.B. White",
    isbn: "978-0-061-96436-7",
    category: "Novel",
    publisher: "HarperCollins",
    publishedYear: 1952,
    quantity: 4,
    available: 1,
    status: "Available",
    description: "The story of a pig named Wilbur and his friendship with a barn spider named Charlotte.",
  },
  {
    id: "BK-006",
    title: "Basic Math for Kids",
    author: "Linda Johnson",
    isbn: "978-1-234-56789-0",
    category: "Educational",
    publisher: "EduPress",
    publishedYear: 2018,
    quantity: 12,
    available: 8,
    status: "Available",
    description: "A fun and engaging introduction to numbers, counting, shapes and basic arithmetic for early learners.",
  },
  {
    id: "BK-007",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    isbn: "978-0-064-40492-4",
    category: "Novel",
    publisher: "HarperCollins",
    publishedYear: 1950,
    quantity: 3,
    available: 0,
    status: "Out of Stock",
    description: "Four siblings discover a magical world through the back of a wardrobe and help Aslan defeat the White Witch.",
  },
  {
    id: "BK-008",
    title: "Learn the Alphabet",
    author: "Sarah Williams",
    isbn: "978-1-987-65432-1",
    category: "Educational",
    publisher: "KidsLearn Publishers",
    publishedYear: 2020,
    quantity: 15,
    available: 11,
    status: "Available",
    description: "A colourful guide helping young children recognise letters and their sounds through pictures and activities.",
  },
];

export const BOOK_CATEGORIES: BookCategory[] = [
  "Picture Book",
  "Story Book",
  "Novel",
  "Educational",
  "Reference",
];