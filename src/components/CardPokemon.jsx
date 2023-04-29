import React from "react";
import { Link } from "react-router-dom";


export const CardPokemon = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
			<div className='card-img'>
				<img
					src={pokemon.sprites.other.home.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			
			<div className='card-info'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{pokemon.name}</h3>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
			
			<div className="card-img2">
				<img
					src={pokemon.sprites.other.home.front_shiny}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<div className='card-info2'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{pokemon.name}</h3> <h4>★ Shiny</h4>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
		</Link>
    );
};