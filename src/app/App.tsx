import { Board } from '../pages/Board/Board.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout.tsx'
import Home from '../pages/Home/Home.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='board/:id' element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
