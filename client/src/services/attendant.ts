import api from '@/services/api';
import type { Attendant, AttendantDto } from '@/types/Attendant.ts';

export const getAttendants = async (): Promise<Attendant[]> => {
  const { data: attendants } = await api.get<Attendant[]>('/attendant');

  return attendants || [];
};

export const createAttendant = async (attendantDto: AttendantDto, tournamentId: number): Promise<Attendant> => {
  const { data: attendant } = await api.post<Attendant>(`/attendant/new/${tournamentId}`, attendantDto);
  console.log('Created attendant:', tournamentId, attendant);
  return attendant;
};
