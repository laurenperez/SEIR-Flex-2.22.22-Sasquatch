import React from 'react';
import { graphql } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

const Page = ({
        location,
        data: {
            markdownRemark: {
                html,
                frontmatter: {
                    title
                }
            }
        }
    }) => {
    return (
        <>
        <Head pageTitle={title} />
            <div style={{margin: '1rem 0 5rem 0'}}>
                <Breadcrumb 
                    location={location} 
                    crumbLabel={title} 
                />
            </div>
            <main dangerouslySetInnerHTML={{ __html: html }}/>
        </>
    );
};

export const query = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {   
            html 
            frontmatter {
                title
            }
        }
    }
`;

export default Page;