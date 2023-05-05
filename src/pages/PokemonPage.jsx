import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useParams } from "react-router-dom";
import { primerMayuscula } from "../helper/helper";
import { Loader } from "../components/Loader";

export const PokemonPage = () => {

	// Variables que importan la informacion del pokemon
    const {getPokemonByID} = useContext(PokemonContext)

    const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState({})

    const {id} = useParams()

    const fetchPokemon = async(id) => {
        const data = await getPokemonByID(id)
        setPokemon(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPokemon(id)
    }, [])
    
    return (
		//Estructura en HTML
        <main className="container mainpokemon">
            {loading ? (
				<Loader />
			) : (
				<>
					<div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.home.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{primerMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{type.type.name}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>{pokemon.height}</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokemon.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h1>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>

					<div className='header-main-pokemon'>
						<div className='container-info-pokemon-shiny'>
							<h2>Aspecto Tipo Shiny de {primerMayuscula(pokemon.name)}</h2>
							<h3>★</h3>
						</div>
						<div className='container-img-pokemon-shiny'>
							<img
								src={pokemon.sprites.other.home.front_shiny}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>
					</div>

				</>
			)}
        </main>
		
    )
}