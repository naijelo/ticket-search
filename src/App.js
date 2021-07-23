import "./App.css";
import TicketSearch from "./components/TicketSearch/TicketSearch";
import {GlobalStyles} from "./GlobalStyles.style";

function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <TicketSearch/>
    </div>
  );
}

export default App;
