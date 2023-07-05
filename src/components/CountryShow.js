import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import translate from "translate";

translate.engine = "google";

const CountryShow = ({ country }) => {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const [nameCommom, setCommomName] = useState();
    const [nameOfficial, setOfficialName] = useState();
    const [capital, setCapital] = useState();
    const [continent, setContinent] = useState();
    const [language, setLanguage] = useState();
    const [currency, setCurrency] = useState();
    const [flag, setFlag] = useState();

    const translateFunction = useCallback(async () => {
        try {
            if (country.name.common) {
                const nameCommom = await translate(country.name.common, "pt");
                let words = nameCommom.split(' ');
                let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
                capitalizedWords = capitalizedWords.join(' ');
                setCommomName(nameCommom.length > 0 ? capitalizedWords : "Indefinido");
            } else {
                setCommomName("Indefinido");
            }

            if (country.name.official) {
                const nameOfficial = await translate(country.name.official, "pt");
                let words = nameOfficial.split(' ');
                let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
                capitalizedWords = capitalizedWords.join(' ');
                setOfficialName(nameOfficial.length > 0 ? capitalizedWords : "Indefinido");
            } else {
                setOfficialName("Indefinido");
            }

            if (country.capital) {
                const capital = await translate(country.capital, "pt");
                let words = capital.split(' ');
                let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
                capitalizedWords = capitalizedWords.join(' ');
                setCapital(capital.length > 0 ? capitalizedWords : "Indefinido");
            } else {
                setCapital("Indefinido");
            }

            if (country.continents) {
                const continent = await translate(country.continents, "pt");
                let words = continent.split(' ');
                let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
                capitalizedWords = capitalizedWords.join(' ');
                setContinent(continent.length > 0 ? capitalizedWords : "Indefinido");
            } else {
                setContinent("Indefinido");
            }

            if (country.languages) {
                const languages = country.languages;
                const languagesValues = Object.values(languages);
                if (languagesValues.length > 0) {
                    const language = await translate(languagesValues[0], "pt");
                    let words = language.split(' ');
                    let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
                    capitalizedWords = capitalizedWords.join(' ');
                    setLanguage(capitalizedWords);
                } else {
                    setLanguage("Indefinido");
                }
            } else {
                setLanguage("Indefinido");
            }

            if (country.currencies) {
                const currency = country.currencies[Object.keys(country.currencies)[0]].symbol;
                setCurrency(currency.length > 0 ? currency : "Indefinido");
            } else {
                setCurrency("Indefinido");
            }

            if (country.flags) {
                const flag = country.flags.png;
                setFlag(flag);
            } else {
                setFlag("Bandeira Indisponível");
            }

        } catch (error) {
            console.error(error);
        }
    }, [country.name.common, country.name.official, country.capital, country.continents]);

    useEffect(() => {
        translateFunction();
    }, [translateFunction]);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className='flex-container'>
            <div className='container'>
                <h1>{nameCommom}</h1>
                <h3>{nameOfficial}</h3>
                <h4>Capital: {capital}</h4>
                <h4>Continente: {continent}</h4>
                <h4>Língua: {language}</h4>
                <h4>Moeda: {currency}</h4>
            </div>
            <div className='image-container'>
                <img src={flag} alt={nameCommom} className="image" />
                <button onClick={handleGoBack}>Voltar</button>
            </div>
        </div>
    );
}

export default CountryShow;
