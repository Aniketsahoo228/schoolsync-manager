export type TransportStatus = "Active" | "Inactive" | "Maintenance";

export interface Transport {
  id: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  licenseNumber: string;
  contactNumber: string;
  driverAddress: string;
  status: TransportStatus;
  studentsAssigned: number;
  capacity: number;
}

export const TRANSPORTS: Transport[] = [
  {
    id: "TRP-001",
    routeName: "Route A — Bhubaneswar North",
    vehicleNumber: "OD 05 AB 1234",
    driverName: "Ramesh Nayak",
    licenseNumber: "DL-OD-2018-0012345",
    contactNumber: "9876541001",
    driverAddress: "12, Station Road, Bhubaneswar",
    status: "Active",
    studentsAssigned: 28,
    capacity: 35,
  },
  {
    id: "TRP-002",
    routeName: "Route B — Bhubaneswar South",
    vehicleNumber: "OD 05 CD 5678",
    driverName: "Suresh Das",
    licenseNumber: "DL-OD-2019-0067890",
    contactNumber: "9876541002",
    driverAddress: "34, MG Road, Bhubaneswar",
    status: "Active",
    studentsAssigned: 32,
    capacity: 35,
  },
  {
    id: "TRP-003",
    routeName: "Route C — Cuttack Highway",
    vehicleNumber: "OD 05 EF 9012",
    driverName: "Bijay Pradhan",
    licenseNumber: "DL-OD-2020-0011122",
    contactNumber: "9876541003",
    driverAddress: "7, NH-16, Cuttack",
    status: "Maintenance",
    studentsAssigned: 0,
    capacity: 40,
  },
  {
    id: "TRP-004",
    routeName: "Route D — Khandagiri Area",
    vehicleNumber: "OD 05 GH 3456",
    driverName: "Pradeep Mohanty",
    licenseNumber: "DL-OD-2017-0033344",
    contactNumber: "9876541004",
    driverAddress: "56, Khandagiri, Bhubaneswar",
    status: "Active",
    studentsAssigned: 20,
    capacity: 35,
  },
  {
    id: "TRP-005",
    routeName: "Route E — Patia Sector",
    vehicleNumber: "OD 05 IJ 7890",
    driverName: "Krushna Rath",
    licenseNumber: "DL-OD-2021-0099900",
    contactNumber: "9876541005",
    driverAddress: "89, Patia, Bhubaneswar",
    status: "Inactive",
    studentsAssigned: 0,
    capacity: 30,
  },
];
