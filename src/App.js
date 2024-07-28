import styles from './App.module.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Page from './components/Pages/Page'

import {useState} from 'react'
import MouseFollower from './components/MouseFollower/MouseFollower'

function App() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.app}>
      <Header />
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <Page currentPage={currentPage} />
      <MouseFollower />
    </div>
  );
}

export default App;
