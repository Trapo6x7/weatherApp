import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

function TemperatureChart({ forecastDays }) {
  return (
    <div className="temperature-chart">
      <h3>Température sur 5 jours</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastDays}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
