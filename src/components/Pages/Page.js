import React from "react";
import styles from './Page.module.css'

import Home from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import Techs from './Techs/Techs'

function Page({currentPage}){

    const renderPage = () => {
        switch (currentPage) {
          case "Home":
            return <Home />;
          case "Projects":
            return <Projects />;
          case "Techs":
            return <Techs />
          case "Experience":
            return <Experience />;
          case "Contact":
            return <Contact />;
          case "About":
            return <About />;
          default:
            return <Home />;
        }
    }


    return (
        <div className={styles.page}>
            {renderPage()}
        </div>
    )
}

export default Page