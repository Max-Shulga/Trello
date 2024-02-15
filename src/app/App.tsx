// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react';
import {Board} from "../pages/Board/Board.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/Layout/Layout.tsx";


function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Board/>}/>
                        <Route path="board" element={<Board/>}/>
                        <Route path="link1" element={<Board/>}/>
                        <Route path="link2" element={<Board/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
    )
}

export default App;