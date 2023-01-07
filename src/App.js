
import './App.css';
import React from 'react';
const PokemonList = React.lazy(() => import('./Component/PokemonList'));
function App() {
  return (
    <div className="App bg-primary" >
      <PokemonList />

    </div>
  );
}

export default App;
