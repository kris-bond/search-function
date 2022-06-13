import { useEffect, useState } from 'react';

function App() {

  const { search, animals } = useAnimalSearch();

  return (
    <main>
      <h1>Search for an animal:</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

// dumb UI component
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

// custom Hook
function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  // store the last query
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    // get the last query if exists
    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}

export default App
