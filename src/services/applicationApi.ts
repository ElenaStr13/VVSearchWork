import { mockFetch } from './mockFetch';
import type { ApplicationData } from '../types/application';

export const submitApplication = async (
  application: ApplicationData,
): Promise<ApplicationData> => {
  return mockFetch<ApplicationData>(application);
};