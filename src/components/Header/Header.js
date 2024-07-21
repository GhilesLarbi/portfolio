import React from "react";
import styles from './Header.module.css'

import {Sun as SunIcon} from './../Icons'
import { DownArrow as DownArrowIcon } from "./../Icons";

function Header() {
    return (
        <header className={styles.header}>
            <button className={styles.lang_btn}>
                <span>EN</span>
                <DownArrowIcon />
            </button>
            <button className={styles.theme_btn}>
                <SunIcon />
            </button>
        </header>
    )
}

export default Header