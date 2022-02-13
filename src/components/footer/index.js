import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import * as styles from './footer.module.scss';

const Footer = () => (
    <footer className={styles.footer}>
        <p>Copyright &copy; General Assembly {new Date().getFullYear()}</p>
        <section>
            <a href="https://www.facebook.com/generalassembly/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x"/>
            </a>
            <a href="https://www.linkedin.com/school/general-assemb-ly/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://twitter.com/GA" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x"/>
            </a>
        </section>
    </footer>
);

export default Footer;