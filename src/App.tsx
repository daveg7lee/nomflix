import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Page/Home';
import Search from './Page/Search';
import Tv from './Page/Tv';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/tvs/:tvId" element={<Tv />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/searches/:id" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
