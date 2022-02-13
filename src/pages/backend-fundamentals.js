import React from 'react';
import { graphql } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';
import LectureCard from '../components/lecture-card';

import * as styles from '../styles/course-content-display.module.scss';


const BackendFundamentals = function({ data, location }) {
    
   const { allMarkdownRemark } = data;

   const lessons = allMarkdownRemark.edges.map(({ node }) => 
      <LectureCard 
        key={node.id}
        slug={node.fields.slug}
        title={node.frontmatter.title}
        topics={node.frontmatter.topics} 
      />
   );

    return (
        <> 
        <Head pageTitle="Backend Fundamentals"/>
          <div style={{margin: '1rem 0 5rem 0'}}>
            <Breadcrumb 
                location={location} 
                crumbLabel="Backend Fundamentals"
            />
          </div>
            <h1>Backend Fundamentals</h1>
            <main className={styles.main}>
              {lessons}
            </main>
        </>
    );
}

export default BackendFundamentals;

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Backend Fundamentals"}, 
          type: {eq: "homepage"}}}
            sort: {fields:  [frontmatter___week, frontmatter___day]}
        ){
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            track
            title
            week
            day
            type
            topics
          }
        }
      }
    }
  }
`;
