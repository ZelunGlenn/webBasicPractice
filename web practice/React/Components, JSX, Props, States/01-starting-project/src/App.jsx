
import Header from './components/Header/Header.jsx';
import CoreConcept  from './components/CoreConcept/CoreConcept.jsx';
import { CORE_CONCEPTS } from './data.js';
import  TabButton  from './components/TabButton/tabButton.jsx';


import React, { useState } from 'react';
import { EXAMPLES } from './data.js';





function App() {

  const [tabContent, setTabContent] = useState('components');

  const handleClick = (selectedButton) => {
    setTabContent(selectedButton);
    console.log("Tab Content: ", tabContent);
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
            <TabButton class = "" onSelect = { () => handleClick('components') }> Components </TabButton>
            <TabButton class = "" onSelect = { () => handleClick('jsx') }> JSX </TabButton>
            <TabButton class = "" onSelect = { () => handleClick('props') }> Props </TabButton>
            <TabButton class = "" onSelect = { () => handleClick('state') }> State </TabButton>
          </menu>
          <div id="tab-content">
            <h3>{EXAMPLES[tabContent].title}</h3>
            <p>{EXAMPLES[tabContent].description}</p>
            <pre>
              <code>{EXAMPLES[tabContent].code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
