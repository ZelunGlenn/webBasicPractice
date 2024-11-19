import React, { useState, useEffect } from 'react';
import heroImage from './assets/react-core-concepts.png';
import reUseSectionImg1 from './assets/components.png';
import { CORE_CONCEPTS } from './data.js';

const options = ['basic', 'intermediate', 'advanced'];

const generationNumber = (max) => {  
  // generate a random numebr that change every 2 seconds
  return Math.floor(Math.random() * (max + 1));
}

const CoreConcept = ({image, description, title}) => {
  return (
    <li>
      <img src={image} alt={description} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  )
}


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


function App() {
  return (
    <>
    <Header />
    <div>
      <main>
        <section id = "core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          <CoreConcept  
            title={CORE_CONCEPTS[0].title}
            description={CORE_CONCEPTS[0].description}
            image={CORE_CONCEPTS[0].image}            
          />
          <CoreConcept
            {...CORE_CONCEPTS[1]}
          />
          <CoreConcept
            {...CORE_CONCEPTS[2]}
          />
          <CoreConcept
            {...CORE_CONCEPTS[3]}
          />
        </ul>
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
