import {Outlet} from "react-router-dom";

import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";


export default function Layout() {
    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}