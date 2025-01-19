import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts/CoreConcepts.jsx';
import Examples from './components/Examples/Examples.jsx';





function App() {




  return (
    // fragment tag
    <>
    <Header />
    <div>
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
    </>
  );
}

export default App;
