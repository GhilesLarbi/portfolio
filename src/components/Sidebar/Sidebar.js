import React from "react";
import styles from './Sidebar.module.css'

import logo from '../../images/logos/logo.svg'

import {Facebook as FacebookLogo} from '../Icons/Logos'
import {Twitter as TwitterLogo} from '../Icons/Logos'
import {Telegram as TelegramLogo} from '../Icons/Logos'
import {Github as GithubLogo} from '../Icons/Logos'
import {Arrow as ArrowIcon} from '../Icons/'



function Sidebar({ currentPage, onPageChange }) {
    const menuItems = ["Home", "Projects", "Techs", "Experience", "About", "Contact"];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={logo} />
            </div>
            <nav className={styles.nav}>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item}>
                                <button onClick={() => onPageChange(item)} className={`${styles.navBtn} ${currentPage === item ? styles.active : ''}`}>
                                    <p>{item}</p>
                                    <ArrowIcon />
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