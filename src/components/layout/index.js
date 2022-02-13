import React, { Fragment, useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import NavBar from '../responsiveNav';
import Footer from '../footer';
import Search from '../search';
import Timer from '../timer';

import '../../styles/base.scss';

import * as styles from './layout.module.scss';
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css';

const Layout = ({ children  }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);

    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    navigationLinks {
                        title
                        slug
                    }
                    homeworkSubmissionLink {
                        title
                        href
                    }
                }
            }
        }
    `);

    function toggleModal() {
        if(isSmallScreen) return;
        setIsOpen(!modalIsOpen);
    }


    function handleMediaQueryChange(mediaQuery) {
        if (mediaQuery.matches) {
          setIsSmallScreen(true);
        } else {
          setIsSmallScreen(false);
        }
    }

    function handleKeyboard({ repeat, ctrlKey, key }) {
        if (repeat) return;
        if ((ctrlKey && key === 't')) toggleModal();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);
        return () => document.removeEventListener('keydown', handleKeyboard);
    });
  
    
    useEffect(() => {
        
      const mediaQuery = window.matchMedia("(max-width: 1065px)");
      
      mediaQuery.addEventListener('change', handleMediaQueryChange);
  
      handleMediaQueryChange(mediaQuery);
  
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }, []);

    return (
        <Fragment>
            <div className={styles.outerContainer}>
                <NavBar 
                    title={site.siteMetadata.title}
                    navigationLinks={site.siteMetadata.navigationLinks}
                    homeworkSubmissionLink={site.siteMetadata.homeworkSubmissionLink}
                    isSmallScreen={isSmallScreen}
                />
                <div 
                    className={styles.innerContainer}>
                    <Timer
                        modalIsOpen={modalIsOpen}
                        toggleModal={toggleModal}
                    />
                    <Search />
                    { children }
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default Layout;