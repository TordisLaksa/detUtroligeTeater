import { useState } from "react"
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import './BurgerMenu.scss'


export const BurgerMenu = () => {

    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <>
            <div className={isActive ? 'burgerMenuActive' : 'burgerMenu'} onClick={handleToggle}>
                <AiOutlineMenu className="burgerMenuHome" />
                <AiOutlineClose className="burgerMenuClose" />
            </div>
            
            <ul className={isActive ? 'activeMenu' : 'menu'}>
                <li><Link className='navigationLinks' to={'./'} onClick={handleToggle}>Forside</Link></li>
                <li><Link className='navigationLinks' to={'./events'} onClick={handleToggle}>FORESTILLINGER & EVENTS</Link></li>
                <li><Link className='navigationLinks' to={'./actors'} onClick={handleToggle}>SKUESPILLERE</Link></li>
                <li><Link className='navigationLinks' to={'./login'} onClick={handleToggle}>LOGIN</Link></li>               
            </ul>
        </>
    )
}