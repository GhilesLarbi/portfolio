import React from "react";
import styles from './Home.module.css'

import {Arrow as ArrowIcon} from "../../Icons";

function Home(){
    return <section className={styles.section}>
        <p className={styles.title}>Home</p>
        <h1 className={styles.header}>Hi I'am <span>"Ghiles Larbi"</span> <br/>
        let me <span>design</span> your website</h1>
        <p className={styles.body}>Passionate web developer and designer, dedicated to crafting exceptional digital experiences. 
        From concept to code, I bring creativity and expertise to every project. Let's collaborate to bring your vision to life.</p>

        <button className={styles.button}>
            <span>See Projects</span>
            <ArrowIcon className={styles.buttonIcon} />
        </button>

        <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
                <div className={styles.terminalHeaderCircle}></div>
                <div className={styles.terminalHeaderCircle}></div>
                <div className={styles.terminalHeaderCircle}></div>
            </div>
            <div className={styles.terminalContent}>
                Unknown@unknown ~ :
            </div>
        </div>
    </section>
}

export default Home