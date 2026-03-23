import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const searchContainerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
};

const inputGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    flex: '1',
    minWidth: '150px'
};

const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
};

const cardStyle = {
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    background: 'white',
    transition: 'transform 0.2s'
};

const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem'
};

export default function Search() {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [search, setSearch] = useState({
        name: '',
        breed: '',
        age: ''
    });

    useEffect(() => {
        fetch('/api/getAnimals')
            .then(res => res.json())
            .then(data => {
                setAnimals(data);
                setFilteredAnimals(data);
            });
    }, []);

    useEffect(() => {
        const filtered = animals.filter(animal => {
            return (
                animal.name.toLowerCase().includes(search.name.toLowerCase()) &&
                animal.breed.toLowerCase().includes(search.breed.toLowerCase()) &&
                (search.age === '' || animal.age.toString() === search.age)
            );
        });
        setFilteredAnimals(filtered);
    }, [search, animals]);

    const handleSearchChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={searchContainerStyle}>
            <Head>
                <title>Поиск питомцев - Petto</title>
            </Head>

            <button onClick={() => window.location.href='/'} style={{marginBottom: '1rem', cursor: 'pointer'}}>← Назад</button>
            <h1 style={{textAlign: 'center', color: '#333'}}>Поиск питомцев</h1>

            <div style={inputGroupStyle}>
                <input
                    type="text"
                    name="name"
                    placeholder="Поиск по кличке..."
                    style={inputStyle}
                    value={search.name}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="breed"
                    placeholder="Поиск по породе..."
                    style={inputStyle}
                    value={search.breed}
                    onChange={handleSearchChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Поиск по возрасту..."
                    style={inputStyle}
                    value={search.age}
                    onChange={handleSearchChange}
                />
            </div>

            <div style={cardGridStyle}>
                {filteredAnimals.length > 0 ? (
                    filteredAnimals.map((animal, i) => (
                        <div key={i} style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src={animal.img} alt={animal.name} style={imgStyle} />
                            <h3>{animal.name}</h3>
                            <p><strong>Порода:</strong> {animal.breed}</p>
                            <p><strong>Возраст:</strong> {animal.age} лет</p>
                            <p>{animal.content}</p>
                        </div>
                    ))
                ) : (
                    <p style={{gridColumn: '1 / span 2', textAlign: 'center', padding: '2rem'}}>Питомцы не найдены</p>
                )}
            </div>
        </div>
    );
}
