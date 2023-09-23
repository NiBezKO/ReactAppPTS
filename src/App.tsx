import { Routes, Route } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
//useSelector - хук, отвечает за вытаскивание данных из хранилища
//что то вроде useContext
//useDispatch - это хук, который говорит: сделай что-то

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

// export const SearchContext = React.createContext();

function App() {
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
