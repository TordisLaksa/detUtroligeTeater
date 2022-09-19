import { NavLink } from "react-router-dom"
import { Login } from '../../pages/Login/Login'

export const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={'/'}>FORSIDE</NavLink></li>
                <li><NavLink to={'/events'}>FORESTILLINGER & EVENTS</NavLink></li>
                <Login />
            </ul>
        </nav>
    )
}