import styles from './App.module.css'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './components/Pages/Home/Home'
import About from './components/Pages/About/About'
import Contact from './components/Pages/Contact/Contact'
import Experience from './components/Pages/Experience/Experience'
import Projects from './components/Pages/Projects/Projects'
import Techs from './components/Pages/Techs/Techs'

import {useState} from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState("Home")

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }


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
    <div className={styles.app}>
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
}

export default App;
