import { useState } from "react";

export default function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const search = async (city) => {
        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
            );
            const geoData = await geoRes.json();

            if (!geoData.results) {
                setError("City not found. Try another name.");
                return;
            }

            const { latitude, longitude, name } = geoData.results[0];
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
            );
            const weatherData = await weatherRes.json();

            setWeather({ name, ...weatherData.current });
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, search };
}