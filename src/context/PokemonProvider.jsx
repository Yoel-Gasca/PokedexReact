import { useEffect, useState } from 'react';
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {

    // Esto marca el inicio desde el pokémon 0
    const [offset, setOffset] = useState(0)

    // Proporciona 50 Pokémones de la API
    const getAllPokemons = async(limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();
        console.log(data);
    }

    useEffect(() =>{
        getAllPokemons()
    }, [])

    // Provee los valores de informacion a la aplicacion
    return (
        <PokemonContext.Provider value={{
            numero: 0
        }}>
            {children}
        </PokemonContext.Provider>
    );
};