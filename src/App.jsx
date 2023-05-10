import { AppRouter } from "./AppRouter";
import { PokemonContext } from "./context/PokemonContext";
import { PokemonProvider } from "./context/PokemonProvider";

// Funcion general de la aplicacion
function App() {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  );
  
}

export default App;
