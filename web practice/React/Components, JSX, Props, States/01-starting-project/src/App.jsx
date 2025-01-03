
import Header from './components/Header/Header.jsx';
import CoreConcept  from './components/CoreConcept/CoreConcept.jsx';
import { CORE_CONCEPTS } from './data.js';
import  TabButton  from './components/TabButton/tabButton.jsx';










function App() {

  const handleClick = () => {
    console.log("Button clicked!")
  }

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
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton class = "" onSelect = { handleClick }> Components </TabButton>
            <TabButton class = "" onSelect = { handleClick }> JSX </TabButton>
            <TabButton class = "" onSelect = { handleClick }> Props </TabButton>
            <TabButton class = "" onSelect = { handleClick }> State </TabButton>
          </menu>
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
