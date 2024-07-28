import { useEffect, useState, useRef } from 'react';

import styles from './Page.module.css'

import Home from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import Techs from './Techs/Techs'

import { Bg } from "../Icons";

function Page({ currentPage }) {

  const pageRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const animationRef = useRef(null)

  console.log(scrollPosition)
  console.log(animationRef)

  useEffect(() => {
    const currentPage = pageRef.current
    if (!currentPage) return

    console.log("-------------------------------------------------")
    console.log("client heigh : ", currentPage.clientHeight);
    console.log("window heigh : ", window.innerHeight)

    const handleMouseWheel = (e) => {
      const delta = e.deltaY;
      const scrollingRate = delta > 0 ? 50 : -50

      const maxScroll = currentPage.clientHeight - window.innerHeight;
      const minScroll = 0



      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Démarrer une nouvelle animation
      animationRef.current = requestAnimationFrame(() => {
        setScrollPosition(prevPosition => {
          let newPosition = prevPosition + scrollingRate;
          if (newPosition < minScroll) newPosition = minScroll;
          if (newPosition > maxScroll) newPosition = maxScroll;
          return newPosition;
        });
      });
    }

    console.log("Adding wheel listener");
    currentPage.addEventListener('wheel', handleMouseWheel, { passive: false })

    return () => {
      currentPage.removeEventListener('wheel', handleMouseWheel);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

  }, [currentPage])

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.style.transform = `translateY(${-scrollPosition}px)`;
    }
  }, [scrollPosition])


  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Home ref={pageRef} />;
      case 2:
        return <Projects ref={pageRef} />;
      case 3:
        return <Techs ref={pageRef} />
      case 4:
        return <Experience ref={pageRef} />;
      case 5:
        return <Contact ref={pageRef} />;
      case 6:
        return <About ref={pageRef} />;
      default:
        return <Home ref={pageRef} />;
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