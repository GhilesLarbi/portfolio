import styles from './App.module.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Page from './components/Pages/Page'

import {useState} from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState("Home")

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.app}>
      <Header />
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <Page currentPage={currentPage} />
    </div>
  );
}

export default App;
