import { apiClient } from '../api/client';
import type { SearchFormData } from '../types';
import type { WeatherResponse } from '../types/weather';

export async function getWeatherByCity(
    formData: SearchFormData,
    signal?: AbortSignal
): Promise<WeatherResponse> {
    const { city, country } = formData;
    const { data } = await apiClient.get<WeatherResponse>('/weather', {
        params: {
        q: `${city},${country}`,
        units: 'metric',
        lang: 'es',
        },
        signal,
    });

    return data;
}