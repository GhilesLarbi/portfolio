import React from "react";
import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <button>EN</button>
            <button>Dark</button>
        </header>
    )
}

export default Header