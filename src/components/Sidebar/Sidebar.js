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
    const menuItems = ["Home", "Projects", "Techs", "Experience", "About", "Contact"];

    const getIcon = (menauItem) => {
        switch (menauItem) {
            case "Home":
                return <HomeIcon className={styles.navBtn_icon} />
            case "Projects":
                return <ProjectsIcon className={styles.navBtn_icon} />
            case "Techs":
                return <TechsIcon className={styles.navBtn_icon} />
            case "Experience":
                return <ExperienceIcon className={styles.navBtn_icon} />
            case "About":
                return <AboutIcon className={styles.navBtn_icon} />
            case "Contact":
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
                    {menuItems.map((item) => (
                        <li key={item}>
                            <button onClick={() => onPageChange(item)} className={`${styles.navBtn} ${currentPage === item ? styles.active : ''}`}>
                                {getIcon(item)}
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