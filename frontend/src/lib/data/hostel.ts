export type RoomAvailability = 'Available' | 'Full';
export type RoomType = 'Normal' | 'AC' | 'Suite' | 'Medium' | 'Big' | 'Small';

export interface Room {
  id: string;
  block: string;
  roomNo: string;
  roomType: RoomType;
  noOfBeds: number;
  costPerBed: string;
  availability: RoomAvailability;
}

export const ROOM_TYPES: RoomType[] = ['Normal', 'AC', 'Suite', 'Medium', 'Big', 'Small'];
export const BLOCKS = ['A Block', 'B Block', 'C Block', 'D Block'];

export const mockRooms: Room[] = [
  { id: '1', block: 'A Block', roomNo: '101', roomType: 'Medium', noOfBeds: 6, costPerBed: '$10', availability: 'Full' },
  { id: '2', block: 'A Block', roomNo: '101', roomType: 'Medium', noOfBeds: 6, costPerBed: '$10', availability: 'Available' },
  { id: '3', block: 'A Block', roomNo: '102', roomType: 'Medium', noOfBeds: 6, costPerBed: '$10', availability: 'Full' },
  { id: '4', block: 'B Block', roomNo: '104', roomType: 'Big', noOfBeds: 8, costPerBed: '$10', availability: 'Full' },
  { id: '5', block: 'A Block', roomNo: '107', roomType: 'Normal', noOfBeds: 4, costPerBed: '$25', availability: 'Available' },
  { id: '6', block: 'B Block', roomNo: '201', roomType: 'AC', noOfBeds: 2, costPerBed: '$40', availability: 'Available' },
  { id: '7', block: 'C Block', roomNo: '301', roomType: 'Suite', noOfBeds: 1, costPerBed: '$60', availability: 'Full' },
  { id: '8', block: 'C Block', roomNo: '302', roomType: 'Normal', noOfBeds: 4, costPerBed: '$25', availability: 'Available' },
];
