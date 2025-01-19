import Header from './components/Header/Header.jsx';
import CoreConcept  from './components/CoreConcept/CoreConcept.jsx';
import { CORE_CONCEPTS } from './data.js';
import  TabButton  from './components/TabButton/tabButton.jsx';


import React, { useState } from 'react';
import { EXAMPLES } from './data.js';





function App() {

  const [tabContent, setTabContent] = useState();

  const handleClick = (selectedButton) => {
    setTabContent(selectedButton);
  }

  let selectedTabContent = (
    <p>Please select a tab.</p>
  );

  if (tabContent) {
    selectedTabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[tabContent].title}</h3>
        <p>{EXAMPLES[tabContent].description}</p>
        <pre>
          <code>{EXAMPLES[tabContent].code}</code>
        </pre>
      </div>
    )
  }


  return (
    // fragment tag
    <>
    <Header />
    <div>
      <main>
        <section id = "core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {
            CORE_CONCEPTS.map((core_concept, index) => {
              return (
                <CoreConcept
                  key = {index}
                  {...core_concept}
                />
              )
            })
          }
          {/* <CoreConcept  
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
          /> */}
        </ul>
        </section>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton class = "" isSelected = { tabContent === 'components' } onSelect = { () => handleClick('components') }> Components </TabButton>
            <TabButton class = "" isSelected = { tabContent === 'jsx' } onSelect = { () => handleClick('jsx') }> JSX </TabButton>
            <TabButton class = "" isSelected = { tabContent === 'props' } onSelect = { () => handleClick('props') }> Props </TabButton>
            <TabButton class = "" isSelected = { tabContent === 'state' } onSelect = { () => handleClick('state') }> State </TabButton>
          </menu>
          {selectedTabContent}
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
