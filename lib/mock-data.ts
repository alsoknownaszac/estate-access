// Mock resident data
export interface Resident {
  id: string
  name: string
  houseNumber: string
  accessType: "Resident" | "Visitor" | "Staff"
  lastVisit: string
}

export const mockResidents: Resident[] = [
  {
    id: "1",
    name: "John Smith",
    houseNumber: "101",
    accessType: "Resident",
    lastVisit: "2025-10-27T14:30:00",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    houseNumber: "102",
    accessType: "Resident",
    lastVisit: "2025-10-27T09:15:00",
  },
  {
    id: "3",
    name: "Mike Davis",
    houseNumber: "103",
    accessType: "Visitor",
    lastVisit: "2025-10-26T16:45:00",
  },
  {
    id: "4",
    name: "Emma Wilson",
    houseNumber: "104",
    accessType: "Staff",
    lastVisit: "2025-10-27T08:00:00",
  },
  {
    id: "5",
    name: "Robert Brown",
    houseNumber: "105",
    accessType: "Resident",
    lastVisit: "2025-10-25T11:20:00",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    houseNumber: "106",
    accessType: "Visitor",
    lastVisit: "2025-10-27T13:00:00",
  },
  {
    id: "7",
    name: "James Taylor",
    houseNumber: "107",
    accessType: "Staff",
    lastVisit: "2025-10-27T07:30:00",
  },
  {
    id: "8",
    name: "Patricia Martinez",
    houseNumber: "108",
    accessType: "Resident",
    lastVisit: "2025-10-24T15:10:00",
  },
]
