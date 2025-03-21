import React from 'react';
import './WeatherDays.css';

function WeatherDays({ forecastDays, onDayClick, selectedDay }) {

  if (!forecastDays || forecastDays.length === 0) {
    return <p>Chargement des jours...</p>;
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="card-action">
      {forecastDays.map((day, index) => (
        <a
          key={index}
          href="#"
          className={index === selectedDay ? "font-bold" : ""} // Applique font-bold si c'est le jour sélectionné
          onClick={(e) => {
            e.preventDefault();
            onDayClick(index);
          }} // Quand on clique, on envoie l'index du jour
        >
          {index === 0 ? "Aujourd'hui" : formatDate(day.date)}
          <span className="day-indicator"></span>
        </a>
      ))}
    </div>
  );
}

export default WeatherDays;
