import React from 'react'

function WeatherInfo({ weatherData, isLoading, name }) {

    // console.log(weatherData);
    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };


    return (
        <div className="card-content white-text">
            {isLoading ? <span className="card-title">Loading...</span> :
                <>

                    {isLoading ? (
                        <span className="card-title">Loading...</span>
                    ) : weatherData ? (
                        <>
                            <span className="card-title">{name}{weatherData.city}</span>
                            <p><img src={weatherData.icon} alt="Weather icon" /></p>
                            <span className="temperature">{weatherData.temp}°C</span>
                            <p>{weatherData.condition}</p>
                        </>
                    ) : (
                        <span className="card-title">Pas de données...</span>
                    )}
                </>
            }
        </div>
    )
}

export default WeatherInfo