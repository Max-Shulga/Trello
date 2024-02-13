import {NavLink} from "react-router-dom";

enum Tabs {
    BOARD = 'board',
    LINK1 = 'link1',
    LINK2 = 'link2',
}

export default function Header() {
    return (
        <header>
            <nav>
                <NavLink
                to={`/${Tabs.BOARD}`}
                end>
                    {Tabs.BOARD}
                </NavLink>
                <NavLink
                    to={`/${Tabs.LINK1}`}
                    end>
                    {Tabs.LINK1}
                </NavLink>
                <NavLink
                    to={`/${Tabs.LINK2}`}
                    end>
                    {Tabs.LINK2}
                </NavLink>
            </nav>
        </header>
    )
}