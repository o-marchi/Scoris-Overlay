export type Attendant = {
  id: number;
  name: string;
  team?: string;
  tournamentId: number;
};

export type AttendantDto = {
  name: string;
  team?: string;
  tournamentId: number;
};
