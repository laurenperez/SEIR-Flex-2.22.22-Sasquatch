import React, { useState } from "react";
import { Link } from 'gatsby';
import { CSSTransition } from "react-transition-group";

import logo from '../../../static/ga-logo.svg';

import "./responsiveNav.css";

const ResponsiveNav = ({ 
    title, 
    navigationLinks, 
    homeworkSubmissionLink,
    isSmallScreen 
    }) => {

  
  const [isNavVisible, setNavVisibility] = useState(false);


  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const links = navigationLinks.map(({ title, slug}, idx) => (
    <Link key={idx} to={slug} onClick={toggleNav}>{title}</Link>
  ));

 links.push(
    <a
     onClick={toggleNav}
     key={homeworkSubmissionLink.href} 
     target="_blank" 
     rel="noopener noreferrer"
     href={homeworkSubmissionLink.href}>
       {homeworkSubmissionLink.title}
       </a>
 );


  return (
    <div className="nav-wrapper">
      <Link to="/">
        <img className="logo" src={logo} alt={title} />
      </Link>
      <CSSTransition
        in={isSmallScreen && isNavVisible}
        timeout={350}
        classNames="navAnimation"
        unmountOnExit
      >
        <nav className="nav">
            { links }
        </nav>
      </CSSTransition>
      {
        !isSmallScreen ?
        <nav className="nav">
          { links }
        </nav>
        :
        <>
          <button style={{ display: isNavVisible ? 'inline' : 'none'}} onClick={toggleNav} className={`burger close rotate ${isNavVisible ? 'fadeIn' : 'fadeOut'}`}>
            X
          </button>
          <button style={{ display: isNavVisible ? 'none' : 'inline'}} onClick={toggleNav} className={`burger ${isNavVisible ? 'fadeOut' : 'fadeIn'}`}>
            &#9776;
          </button>
        </>
      }
  
  
    </div>
  );
};

export default ResponsiveNav;