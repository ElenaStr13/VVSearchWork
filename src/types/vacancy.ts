export type VacancyCategory =
  | 'Construction'
  | 'Manufacturing'
  | 'Logistics'
  | 'Hospitality'
  | 'IT'
  | 'Drivers'
  | 'Other';

export interface Vacancy {
  id: number;
  partnerSlug: string;
  title: string;
  category: VacancyCategory;
  country: string;
  city: string;
  salary: string;
  description: string;
}