import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

function TemperatureChart({ forecastDays }) {
  return (
    <div className="temperature-chart">
      <h3>Température sur 5 jours</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={forecastDays}
          margin={{ top: 30, right: 40, left: 30, bottom: 20 }}
          style={{ backgroundColor: '#483f77', borderRadius: '8px' }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.6)" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#ffffff"
            strokeWidth={3}
            dot={{ r: 5, fill: '#615dc8' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
