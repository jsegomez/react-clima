import { getWeatherByCity } from '../services/weatherService';
import { useQuery } from '@tanstack/react-query';
import { weatherKeys } from './weatherKeys';
import type { SearchFormData } from '../types';

export function useWeather(search: SearchFormData) {
  const city = search.city.trim().toLowerCase();
  const { country } = search;

  return useQuery({
    queryKey: weatherKeys.byCity({ city, country }),
    queryFn: ({ signal }) => getWeatherByCity({ city, country }, signal),
    enabled: Boolean(city && country),
  });
}