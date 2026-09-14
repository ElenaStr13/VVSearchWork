import { partners } from '../data/partners';
import { mockFetch } from './mockFetch';

export const getPartners = () => {
  return mockFetch(partners);
};