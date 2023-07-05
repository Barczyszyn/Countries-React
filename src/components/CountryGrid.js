import { useState } from 'react';
import CountryCard from './CountryCard';
import ReactPaginate from 'react-paginate';

const CountryGrid = ({ countries }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  
  const handlePageChange = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(countries.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentCountries = countries.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="grid-container">
        {currentCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default CountryGrid;
