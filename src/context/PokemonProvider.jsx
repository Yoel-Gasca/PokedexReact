import { useEffect, useState } from 'react';
import { PokemonContext } from "./PokemonContext";
import { useForm } from '../hook/useForm';

export const PokemonProvider = ({ children }) => {

    // Esto marca el inicio desde el pokémon 0
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    // Usar funcionamiento de useForm
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch:'',
    });

    // Estados simples para la aplicacion
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    // Proporciona 50 Pokémones de la API
    const getAllPokemons = async(limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();
        
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })
        const results = await Promise.all(promises);

        setAllPokemons([...allPokemons, ...results]);
        setLoading(false);
    }

    // Proporciona Todos los Pokémones que existen en la API
    const getGlobalPokemons = async() => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json();
        
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)

        setGlobalPokemons(results)
        setLoading(false)
    }

    // Proporciona a un Pokémon por su ID
    const getPokemonByID = async(id) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    } 

    useEffect(() =>{
        getAllPokemons()
    }, [])

    useEffect(() => {
        getGlobalPokemons()
    }, [])

    // Provee los valores de informacion a la aplicacion
    return (
        <PokemonContext.Provider 
        value={{
           valueSearch,
           onInputChange,
           onResetForm,
           allPokemons,
           globalPokemons,
           getPokemonByID
        }}>
            {children}
        </PokemonContext.Provider>
    );
};