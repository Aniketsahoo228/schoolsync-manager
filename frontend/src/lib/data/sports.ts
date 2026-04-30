export type SportsStatus = "Active" | "Inactive";

export interface Sport {
  id: string;
  sportsId: string;
  name: string;
  coachName: string;
  startedYear: number;
  status: SportsStatus;
  studentsEnrolled: number;
  description: string;
  emoji: string;
}

export const SPORTS: Sport[] = [
  {
    id: "SPT-001",
    sportsId: "SPT-001",
    name: "Football",
    coachName: "Mr. Anil Kumar",
    startedYear: 2018,
    status: "Active",
    studentsEnrolled: 24,
    description: "Weekly football sessions on the main ground for KG-1 and KG-2 students.",
    emoji: "⚽",
  },
  {
    id: "SPT-002",
    sportsId: "SPT-002",
    name: "Badminton",
    coachName: "Ms. Preethi Sharma",
    startedYear: 2019,
    status: "Active",
    studentsEnrolled: 18,
    description: "Indoor badminton training every Tuesday and Thursday.",
    emoji: "🏸",
  },
  {
    id: "SPT-003",
    sportsId: "SPT-003",
    name: "Cricket",
    coachName: "Mr. Ravi Patel",
    startedYear: 2020,
    status: "Active",
    studentsEnrolled: 30,
    description: "Cricket coaching for KG-2 students on weekday evenings.",
    emoji: "🏏",
  },
  {
    id: "SPT-004",
    sportsId: "SPT-004",
    name: "Swimming",
    coachName: "Ms. Nisha Reddy",
    startedYear: 2021,
    status: "Inactive",
    studentsEnrolled: 0,
    description: "Swimming sessions paused for renovation of the pool facility.",
    emoji: "🏊",
  },
  {
    id: "SPT-005",
    sportsId: "SPT-005",
    name: "Yoga & Gymnastics",
    coachName: "Mrs. Sunita Iyer",
    startedYear: 2017,
    status: "Active",
    studentsEnrolled: 40,
    description: "Daily morning yoga and gymnastics for all classes.",
    emoji: "🤸",
  },
  {
    id: "SPT-006",
    sportsId: "SPT-006",
    name: "Table Tennis",
    coachName: "Mr. David Raj",
    startedYear: 2022,
    status: "Active",
    studentsEnrolled: 14,
    description: "Table tennis available for KG-1 and above every Friday.",
    emoji: "🏓",
  },
];
