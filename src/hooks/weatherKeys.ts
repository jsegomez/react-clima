import type { SearchFormData } from '../types';

export const weatherKeys = {
  all: ['weather'] as const,
  byCity: ({ city, country }: SearchFormData) =>
    [...weatherKeys.all, 'city', { city, country }] as const,
};