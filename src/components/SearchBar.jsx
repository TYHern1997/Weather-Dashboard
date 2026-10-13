import { useState } from 'react';

export default function SearchBar({ onSearch }) {

    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city.trim()) return;
        onSearch(city.trim());
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search a city..."
            />
            <button type="submit">Search</button>

        </form>
    )
}