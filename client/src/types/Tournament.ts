export type Tournament = {
  id: number;
  name: string;
  type: 'SINGLES' | 'TEAMS';
  players: string[];
};

export type TournamentDto = {
  name: string;
  type: 'SINGLES' | 'TEAMS';
};
