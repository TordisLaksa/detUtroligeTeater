import { BurgerMenu } from "../Nav/BurgerMenu"
import { Nav } from "../Nav/Nav"
import './Header.scss';

export const Header = () => {
    return (
        <header>
            <BurgerMenu />
            <Nav />
        </header>
    )
}