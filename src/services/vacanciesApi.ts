import { vacancies } from '../data/vacancies';
import { mockFetch } from './mockFetch';
import type { Vacancy } from '../types/vacancy';

export const getVacancies = async (): Promise<Vacancy[]> => {
  return mockFetch<Vacancy[]>(vacancies);
};

export const getVacanciesByPartner = async (
  partnerSlug: string,
): Promise<Vacancy[]> => {
  const data = await mockFetch<Vacancy[]>(vacancies);

  return data.filter(
    (vacancy) => vacancy.partnerSlug === partnerSlug,
  );
};