import React from 'react';
import { graphql  } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';
import LectureCard from '../components/lecture-card';

import * as styles from '../styles/course-content-display.module.scss';


const ReactFundamentals = function({ data, location }) {
    
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
          <Head pageTitle="React Fundamentals"/>
          <div style={{margin: '1rem 0 5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={"React Fundamentals"}
              />
          </div>
            <h1>React Fundamentals</h1>
            <main className={styles.main}>
              {lessons}
            </main>
        </>
    );
}

export default ReactFundamentals;

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "React Fundamentals"}, 
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
