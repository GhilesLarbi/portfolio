import React from "react";
import styles from './Sidebar.module.css'

import { Logo } from "../Icons/Logos";

import { Facebook as FacebookLogo } from '../Icons/Logos'
import { Twitter as TwitterLogo } from '../Icons/Logos'
import { Telegram as TelegramLogo } from '../Icons/Logos'
import { Github as GithubLogo } from '../Icons/Logos'
import { Arrow as ArrowIcon } from '../Icons/'

import { Home as HomeIcon } from "../Icons/";
import { Projects as ProjectsIcon } from "../Icons/";
import { Techs as TechsIcon } from "../Icons/";
import { About as AboutIcon } from "../Icons/";
import { Contact as ContactIcon } from "../Icons/";
import { Experience as ExperienceIcon } from "../Icons/";



function Sidebar({ currentPage, onPageChange }) {
    const menuItems = ["Accueil", "Projets", "Compétences", "Expérience", "À propos", "Contact"]

    const getIcon = (menauItemNumber) => {
        switch (menauItemNumber) {
            case 1:
                return <HomeIcon className={styles.navBtn_icon} />
            case 2:
                return <ProjectsIcon className={styles.navBtn_icon} />
            case 3:
                return <TechsIcon className={styles.navBtn_icon} />
            case 4:
                return <ExperienceIcon className={styles.navBtn_icon} />
            case 5:
                return <AboutIcon className={styles.navBtn_icon} />
            case 6:
                return <ContactIcon className={styles.navBtn_icon} />
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={styles.nav}>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => onPageChange(index + 1)} className={`${styles.navBtn} ${currentPage === index + 1 ? styles.active : ''}`}>
                                {getIcon(index + 1)}
                                <p>{item}</p>
                                <ArrowIcon className={styles.navBtn_arrow} />
                            </button>

                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.socialIcons}>
                <ul>
                    <li>
                        <a href="#">
                            <FacebookLogo />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <GithubLogo />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TelegramLogo />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TwitterLogo />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar