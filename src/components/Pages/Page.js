import React from "react";
import styles from './Page.module.css'

import Home from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import Techs from './Techs/Techs'

import { Bg } from "../Icons";

function Page({currentPage}){

    const renderPage = () => {
        switch (currentPage) {
          case 1:
            return <Home />;
          case 2:
            return <Projects />;
          case 3:
            return <Techs />
          case 4:
            return <Experience />;
          case 5:
            return <Contact />;
          case 6:
            return <About />;
          default:
            return <Home />;
        }
    }


    return (
        <div className={styles.page}>
            <Bg className={styles.bgpage} />
            {renderPage()}
        </div>
    )
}

export default Page