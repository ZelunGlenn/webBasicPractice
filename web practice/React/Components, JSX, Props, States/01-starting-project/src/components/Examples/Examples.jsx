import TabButton from "../TabButton/tabButton";
import { useState } from 'react';
import { EXAMPLES } from "../../data";
const Examples = () => {

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
  )
}

export default Examples;