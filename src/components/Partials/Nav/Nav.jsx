import { NavLink } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"
import Logo from '../../../Assets/Images/Logo.svg';
import './Nav.scss'
import { SearchBar } from "../Search/SearchBar";


export const Nav = () => {
    const { loginData } = useAuth();
    return (
        <>
        <nav>
            <img src={Logo} alt="Det-Utrolige-Teater" />
            <div id="navWrapper">   
            <SearchBar />
            <ul>    
                <li><NavLink to={'/'}>FORSIDE</NavLink></li>
                <li><NavLink to={'/events'}>FORESTILLINGER & EVENTS</NavLink></li>
                <li><NavLink to={'/actors'}>SKUESPILLERE</NavLink></li>
                <li><NavLink to={'/login'}>{!loginData.access_token ? 'LOGIN' : 'MIN SIDE'}</NavLink></li>
            </ul>
            </div>
        </nav>
        </>
    )
}