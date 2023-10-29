
import { useEffect, useState } from 'react';
import './App.css';
import { List } from './components';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDetails = (items) => {
    const promises = items.map((item) => {
      return fetch(item.url).then((response) => response.json())
    });
    Promise.all(promises)
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    setLoading(true);
    fetch(url)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        const { results } = data;
        loadDetails(results);
      })
      .catch(() => {
        console.error('Error');
      });
  }, []);

  if (loading){
    return <h1>Carregando Exercicio 10...</h1>
  }

  return (
    <div>
      <List items={items} />
    </div>
  );
}

export default App;