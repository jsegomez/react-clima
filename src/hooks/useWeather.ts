import axios from 'axios';

export default function useWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather'; 
    const apiKey = import.meta.env.VITE_API_KEY; 

    const fetchWeather = async (city: string, country: string) => {
        try {
            const response = await axios.get(`${url}?q=${city},${country}&appid=${apiKey}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    return { fetchWeather };
}