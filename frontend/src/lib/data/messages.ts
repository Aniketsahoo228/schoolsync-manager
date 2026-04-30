export type MessageTag = "inbox" | "sent" | "draft" | "important";

export interface Message {
  id: string;
  from: string;
  fromRole: string;
  fromInitial: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  tag: MessageTag;
  avatarColor: string;
}

export const MESSAGES: Message[] = [
  {
    id: "MSG-001",
    from: "Mrs. Anita Verma",
    fromRole: "Teacher",
    fromInitial: "A",
    subject: "Parent-Teacher Meeting Reminder",
    preview: "Please be reminded that the PTM is scheduled for May 10th at 10 AM…",
    body: "Dear Admin,\n\nPlease be reminded that the Parent-Teacher Meeting is scheduled for May 10th at 10 AM in the school auditorium. Kindly ensure all class teachers are available.\n\nRegards,\nMrs. Anita Verma",
    date: "Apr 24, 2025",
    read: false,
    tag: "inbox",
    avatarColor: "#7c3aed",
  },
  {
    id: "MSG-002",
    from: "Mr. Rajesh Mohan",
    fromRole: "Teacher",
    fromInitial: "R",
    subject: "Sports Day Equipment Request",
    preview: "I would like to request additional equipment for the upcoming sports day…",
    body: "Dear Admin,\n\nI would like to request additional equipment for the upcoming Sports Day. Specifically, we need 5 more footballs and 10 badminton rackets.\n\nThank you,\nMr. Rajesh Mohan",
    date: "Apr 23, 2025",
    read: true,
    tag: "inbox",
    avatarColor: "#f59e0b",
  },
  {
    id: "MSG-003",
    from: "Vikram Sharma",
    fromRole: "Parent",
    fromInitial: "V",
    subject: "Aarav's Leave Application",
    preview: "I would like to inform that Aarav will be absent from Apr 28 to Apr 30…",
    body: "Dear Admin,\n\nI would like to inform you that my son Aarav Sharma (STU-001, Nursery A) will be absent from April 28 to April 30 due to a family function. Kindly grant him leave.\n\nThank you,\nVikram Sharma",
    date: "Apr 22, 2025",
    read: false,
    tag: "inbox",
    avatarColor: "#10b981",
  },
  {
    id: "MSG-004",
    from: "Admin",
    fromRole: "Administrator",
    fromInitial: "R",
    subject: "Welcome to Preskool Parent Portal",
    preview: "We are pleased to welcome all new parents to the Preskool parent portal…",
    body: "Dear Parents,\n\nWe are pleased to welcome you all to the Preskool Parent Portal. You can now track your child's attendance, fees, and academic progress online.\n\nBest regards,\nPreskool Administration",
    date: "Apr 20, 2025",
    read: true,
    tag: "sent",
    avatarColor: "#3b82f6",
  },
  {
    id: "MSG-005",
    from: "Ms. Deepika Singh",
    fromRole: "Teacher",
    fromInitial: "D",
    subject: "Music Concert Practice Schedule",
    preview: "Here is the schedule for the upcoming annual music concert rehearsals…",
    body: "Dear Admin,\n\nPlease find attached the rehearsal schedule for the Annual Music Concert. Rehearsals will be held every Wednesday and Friday from 3 PM to 4 PM starting May 5th.\n\nRegards,\nMs. Deepika Singh",
    date: "Apr 19, 2025",
    read: true,
    tag: "important",
    avatarColor: "#ec4899",
  },
];
