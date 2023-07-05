import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import translate from "translate";

translate.engine = "google";

const CountryCard = ({ country }) => {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const [nameCommom, setCommomName] = useState();
    const [capital, setCapital] = useState();
    const [region, setRegion] = useState();

    const name = country.name.common;

    const translateFunction = useCallback(async () => {
        try {
            const nameCommom = await translate(country.name.common, "pt");
            let words = nameCommom.split(' ');
            let capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
            capitalizedWords = capitalizedWords.join(' ');
            setCommomName(nameCommom.length > 0 ? capitalizedWords : "Indefinido");

            const capital = await translate(country.capital, "pt");
            words = capital.split(' ');
            capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
            capitalizedWords = capitalizedWords.join(' ');
            setCapital(capital.length > 0 ? capitalizedWords : "Indefinido");

            const region = await translate(country.region, "pt");
            setRegion(region.length > 0 ? region : "Indefinido");
        } catch (error) {
            console.error(error);
        }
    }, [country.name.common, country.capital, country.region]);

    useEffect(() => {
        translateFunction();
    }, [translateFunction]);

    const navigate = useNavigate();

    const onClickCountry = (name) => {
        navigate(`/countries/${encodeURIComponent(name)}`);
    };

    return (
        <div className="card" onClick={() => onClickCountry(name)}>
            <h3>{nameCommom}</h3>
            <h4>Capital: {capital}</h4>
            <h4>Região: {region}</h4>
        </div>
    );
}

export default CountryCard;
