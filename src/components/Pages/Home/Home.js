import React, { useState, useEffect, useRef } from "react";
import styles from './Home.module.css'
import { Arrow as ArrowIcon } from "../../Icons";
import Shell from '../../Terminal/Shell';
import fileSystem from '../../Terminal/FileSystem/fileSystem';
import Terminal from "../../Terminal/Terminal";

function Home() {

    return (
        <section className={styles.section}>
            <p className={styles.title}>
                <span>Accueil</span>
            </p>
            <h1 className={styles.header}>
                C'est <span className={styles.name}>"Ghiles Larbi"</span> <br />
                laissez-moi <span className={styles.design}>consevoir</span> votre site web
            </h1>
            <p className={styles.body}>
                Développeur web et designer passionné, dédié à la création d'expériences numériques exceptionnelles.
                Du concept au code, j'apporte créativité et expertise à chaque projet. Collaborons pour donner vie à votre vision
            </p>
            <button className={styles.button}>
                <span>voir les projets</span>
                <ArrowIcon className={styles.buttonIcon} />
            </button>
            <Terminal className={styles.terminal} />
        </section>
    );
}

export default Home;