import { useContext } from 'react';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import logo from '../assets/img/Pokedex_logo.png';

export const Navigation = () => {

    // Proporciona la informacion del provider
    const {onInputChange, valueSearch, onResetForm} = useContext(PokemonContext);

    const navigate = useNavigate();

    const onSearchSubmit = (e) => {
        e.preventDefault();
        navigate('/Search', {
            state: valueSearch
        });

        onResetForm();
    };


    return (
            //Estructura en HTML 
            <>
                <header className='container'>
                    <Link to='/' className='logo'>
                        <img src='https://raw.githubusercontent.com/Yoel-Gasca/PokedexReact/main/src/assets/img/Pokedex_logo.png' alt='Logo Pokedex'/>
                    </Link>

                    <form onSubmit={onSearchSubmit}>
                        <div className='form-group'>
                            <svg
                                // Icono de busqueda
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='icon-search'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                                />
                            </svg>

                            <input
                                // Barra de busqueda
                                type='search'
                                name='valueSearch'
                                id=''
                                value={valueSearch}
                                onChange={onInputChange}
                                placeholder='Buscar nombre de pokemon'
                            />
                        </div>

                        <button className='btn-search'>Buscar</button>
                    </form>
                </header>

                <Outlet/>
            </>    
    );
};