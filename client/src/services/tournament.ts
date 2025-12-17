import api from '@/services/api';
import type { Tournament, TournamentDto } from '@/types/Tournament.ts';

export const getTournaments = async (): Promise<Tournament[]> => {
  const { data: tournaments } = await api.get<Tournament[]>('/tournament');

  return tournaments || [];
};

export const createTournament = async (tournamentDto: TournamentDto): Promise<Tournament> => {
  const { data: tournament } = await api.post<Tournament>('/tournament', tournamentDto);

  return tournament;
};
