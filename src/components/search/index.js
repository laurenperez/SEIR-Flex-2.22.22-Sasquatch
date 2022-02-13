import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, connectStateResults, Configure } from 'react-instantsearch-dom';
import logo from '../../../static/ga-logo.svg';


const Search = (props) => {
        const [searchState, setSearchState ] = useState({});
        const searchClient = algoliasearch('PG32PV476S', '2cb8a671f5679cabc44f43a41d5d462e')

        const Results = connectStateResults(({ searchState, searchResults, children }) => {
            if(searchState && searchState.query && children) {
                return children;
            } else {
                return null;
            }
        });

        
        const Hit = useRef(({ hit }) => {
            const handleClick = () => {
                setSearchState({...searchState, query: ''})
            };
            return (
                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <Link to={hit.url} onClick={handleClick} style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{ height: 25, margin: '0px 5px 0px 0px' }} src={logo} alt={hit.title} />
                        <h6>{hit.title.replace(' | SEIR Flex 09/28/2021 - "Phoenix"', '')}</h6>
                    </Link>
                    <p>{hit.content.slice(0, 125) + ' ...'}</p>
                </div>
            );
        });

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={'netlify_61990d90-34b7-4998-987c-600410a12c67_master_all'}
            searchState={searchState}
            onSearchStateChange={setSearchState}
            >
            <SearchBox />
            <Results>
                <Hits 
                    hitComponent={Hit.current}
                />
            </Results>
            <Configure 
                hitsPerPage={3}
            />
        </InstantSearch>
    );
};

export default Search;