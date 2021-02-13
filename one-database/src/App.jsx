import './App.css';
import SearchPlaces from './components/SearchPlaces.jsx';
import SavedPlaces from "./components/SavedPlaces";

function App() {
  return (
    <div className="App">
      <SearchPlaces />
      <SavedPlaces />
    </div>
  );
}

export default App;
