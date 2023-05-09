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
    }, [offset]);

    useEffect(() => {
        getGlobalPokemons()
    }, []);

    // Funcion de boton cargar mas
	const onClickLoadMore = () => {
		setOffset(offset + 50)
	}

    // Funcion del Filter + State
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    });

    const [filteredPokemons, setfilteredPokemons] = useState([]);

    const handleCheckbox = e => {

        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        });
        //Condicionales para mostrar los tipos seleccionados seleccionados
        if (e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon =>
                pokemon.types
                    .map(type => type.type.name)
                    .includes(e.target.name)
                );
                setfilteredPokemons([...filteredPokemons, ...filteredResults]);
        }else {
            const filteredResults = filteredPokemons.filter(
                pokemon =>
                    !pokemon.types
                        .map(type => type.type.name)
                        .includes(e.target.name)
                );
                setfilteredPokemons([...filteredResults]);
        }
    };

    // Provee los valores de informacion a la aplicacion
    return (
        <PokemonContext.Provider 
        value={{
           valueSearch,
           onInputChange,
           onResetForm,
           allPokemons,
           globalPokemons,
           getPokemonByID,
           onClickLoadMore,
           // Loader
           loading,
           setLoading,
           // Btn filter
           active,
           setActive,
           //filter checkBox
           handleCheckbox,
           filteredPokemons
        }}>
            {children}
        </PokemonContext.Provider>
    );
};