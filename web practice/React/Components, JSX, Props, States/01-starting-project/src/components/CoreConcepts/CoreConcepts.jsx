import { CORE_CONCEPTS } from "../../data";
import CoreConcept from "../CoreConcept/CoreConcept.jsx";
const CoreConcepts = () => {
  return (
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
      </ul>
    </section>
  )
  
}

export default CoreConcepts;