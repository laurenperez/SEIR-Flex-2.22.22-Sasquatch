import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ pageTitle }) => {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    keywords
                }
            }
        }
    `);

    const { title, description, keywords } = site.siteMetadata;

    return (
        <Helmet 
            title={`${pageTitle} | ${title}`}
            meta={[
                { name: 'description', content: description },
                { name: 'keywords', content: keywords }
            ]}
        />
    );
};

export default Head;