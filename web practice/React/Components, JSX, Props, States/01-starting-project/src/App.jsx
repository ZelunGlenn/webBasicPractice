
import Header from './components/Header.jsx';
import CoreConcept  from './components/CoreConcept.jsx';
import { CORE_CONCEPTS } from './data.js';



const generationNumber = (max) => {  
  // generate a random numebr that change every 2 seconds
  return Math.floor(Math.random() * (max + 1));
}







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
