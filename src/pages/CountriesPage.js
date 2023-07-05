import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import CountryGrid from '../components/CountryGrid';
import './CountriesPage.css';

const CountriesPage = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCountries = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, []);

    const renderCountries = () => {
        if (loading || !countries?.length) {
            return (
                <h2>Carregando...</h2>
            );
        };

        return (
            <CountryGrid countries={countries} />
        );
    }

    return (
        <div className="countriesList">
            <h1>Lista de Países</h1>
            {renderCountries()}
        </div>
    );
}

export default CountriesPage;
