import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Pokemon from "./pages/Pokemon/Pokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
