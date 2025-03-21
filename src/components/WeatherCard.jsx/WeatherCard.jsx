import React, { useEffect, useState } from 'react'
import './WeatherCard.css'
import WeatherDays from "./WeatherDays/WeatherDays"
import WeatherInfo from "./WeatherInfo/WeatherInfo"
import TemperatureChart from './TemperatureChart/TemperatureChart';

function WeatherCard() {

    const [weather, setWeather] = useState(null);
    const [days, setDays] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(0); // Par défaut, le premier jour
    const [city, setCity] = useState("Saint-Etienne"); // Ville par défaut


    const handleDayClick = (index) => {
        setSelectedDay(index);
    };

    const handleSearch = async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page
        setIsLoading(true); // Afficher le message de chargement

        const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=no`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();

            setTimeout(() => { // Artificial delay
                setWeather({
                    city: json.location.name,
                    icon: json.current.condition.icon,
                    temperature: json.current.temp_c,
                    wind: {
                        speed: json.current.wind_kph,
                        direction: json.current.wind_dir,
                    },
                });

                const forecastDays = json.forecast.forecastday.map(day => ({
                    date: day.date,
                    icon: day.day.condition.icon,
                    temp: day.day.avgtemp_c,
                    condition: day.day.condition.text, // Removed translation
                }));

                setDays(forecastDays);
                setIsLoading(false);
            }, 500); // 500ms delay
        } catch (error) {
            console.error(error.message);
        }
    };


    async function getData() {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=Saint-Etienne&days=5&aqi=no&alerts=no`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            setTimeout(() => { // Artificial delay
                setWeather({
                    city: json.location.name,
                    icon: json.current.condition.icon,
                    temperature: json.current.temp_c,
                    wind: {
                        speed: json.current.wind_kph,
                        direction: json.current.wind_dir,
                    },
                });
                const forecastDays = json.forecast.forecastday.map(day => ({
                    date: day.date,
                    icon: day.day.condition.icon,
                    temp: day.day.avgtemp_c,
                    condition: day.day.condition.text, // Removed translation
                }));

                setDays(forecastDays);
                setIsLoading(false);
            }, 500); // 500ms delay
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={`weather card blue-grey darken-1 flexcol ${isLoading ? 'center-loading' : ''}`}>
            {isLoading ? (
                <div className="loading-spinner"></div> // Full-height loading spinner
            ) : (
                <>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Rechercher une ville"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} // Mettre à jour la ville dans l'état
                        />
                        <button type="submit">Rechercher</button>
                    </form>
                    <article className='flexcol'>
                        <div className='flex'>
                            <WeatherInfo
                                weatherData={days && days[selectedDay]}
                                isLoading={isLoading}
                                name={weather && weather.city}
                            />
                            {days && <TemperatureChart forecastDays={days} />}
                        </div>
                        <WeatherDays forecastDays={days} onDayClick={handleDayClick} selectedDay={selectedDay} />
                    </article>
                </>
            )}
        </div>
    )
}

export default WeatherCard