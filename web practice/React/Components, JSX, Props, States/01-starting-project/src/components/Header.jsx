import heroImage from '../assets/react-core-concepts.png';
import React, { useState, useEffect } from 'react';

const options = ['basic', 'intermediate', 'advanced'];

const Header = () => {

  const [word, setWord] = useState(options[0])


  useEffect(() => {

    const interval = setInterval(() => {

      setWord(options[generationNumber(2)])
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  return (  
    <header>
      <img src={ heroImage } alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        { word } React concepts you will need for almost any app you are going
        to build!
      </p>
    </header>
  )
};

export default Header;