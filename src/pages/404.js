import React from 'react';
import { Link } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

const NotFound = ({ location }) => {
    return (
        <>
        <Head pageTitle="Page Not Found"/>
          <div style={{margin: '1rem 0 5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={'Page Not Found'}
              />
          </div>
            <main>
                <h1>Not Found</h1>
                <p>Sorry the page you requested was not found</p>
                <Link to="/">Go Back Home</Link>
            </main>
        </>
    );
};

export default NotFound;