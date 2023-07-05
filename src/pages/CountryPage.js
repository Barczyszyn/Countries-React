import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CountryShow from '../components/CountryShow';
import './CountryPage.css';

const CountryPage = () => {
    const { name } = useParams();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCountry = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            const data = response.data;
            setCountry(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [name]);


    useEffect(() => {
        fetchCountry();
    }, [fetchCountry]);

    const renderCountry = () => {
        if (loading || !country?.length) {
            return (
                <h2>Carregando...</h2>
            );
        };

        return (
            <CountryShow key={country[0]?.name.common} country={country[0]} />
        );
    }

    return (
        <div className="countryShow">
            {renderCountry()}
        </div>
    );
};

export default CountryPage;