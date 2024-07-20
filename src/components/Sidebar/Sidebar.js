import React  from "react";
import styles from './Sidebar.module.css'

import logo from '../../logo.svg'

function Sidebar({currentPage, onPageChange}) {
    const menuItems = ["Home", "Projects", "Techs", "Experience", "About", "Contact"];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={logo} />
            </div>
            <nav className={styles.nav}>
                <ul>
                    {menuItems.map((item) => (
                            <li 
                                key={item} 
                                className={`${styles.menuItem} ${currentPage === item ? styles.active : ''}`}
                                onClick={() => onPageChange(item)}>
                                {item}
                            </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar