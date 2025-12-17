export type Tournament = {
  id: number;
  name: string;
  type: 'SINGLES' | 'TEAMS';
  players: string[];
};

export type TournamentForm = {
  id: number;
  name: string;
  type: 'SINGLES' | 'TEAMS';
};
