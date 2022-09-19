import { NavLink } from "react-router-dom"
import { Login } from '../../pages/Login/Login'

export const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={'/'}>Home</NavLink></li>
                {/* <li><NavLink to={'/about'}>About</NavLink></li> */}
                <Login />
            </ul>
        </nav>
    )
}