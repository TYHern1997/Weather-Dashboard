const weatherCodes = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌦️" },
    61: { label: "Light rain", icon: "🌧️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Rain showers", icon: "🌦️" },
    82: { label: "Violent showers", icon: "⛈️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    99: { label: "Thunderstorm with hail", icon: "⛈️" },
};

export default function WeatherCard({ weather, unit }) {
    const condition = weatherCodes[weather.weather_code] || {
        label: "Unknown",
        icon: "❓",
    };

    const temp = unit === "C" ? weather.temperature_2m : (weather.temperature_2m * 9) / 5 + 32;

    return (
        <div className="card">
            <h2>{weather.name}</h2>
            <p className="icon">{condition.icon}</p>
            <p>{condition.label}</p>
            <p className="temp">{temp.toFixed(1)}°{unit}</p>
            <p>Wind: {weather.wind_speed_10m} km/h</p>
        </div>
    );
}