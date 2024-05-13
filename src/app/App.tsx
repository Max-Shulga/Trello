import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Board from '../pages/Board/Board';
import Home from '../pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="board/:id" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
