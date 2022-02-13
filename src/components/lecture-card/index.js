import React from 'react';
import { Link } from 'gatsby';

import * as styles from './lecture-card.module.scss';

const LectureCard = (props) => {
    return (
    <Link to={props.slug}>
        <section className={styles.card}>
            <h2>{props.title}</h2>
            <p>{props.topics}</p>
        </section>
    </Link>
    );
};

export default LectureCard;