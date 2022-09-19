import './Footer.scss'
import Facebook from '../../../Assets/Images/Facebook.svg'
import Instagram from '../../../Assets/Images/Instagram.svg'
import LinkedIn from '../../../Assets/Images/LinkedIn.svg'

export const Footer = () => {
    return (
        <footer>
            <div id="footerDivider">
                <article>
                    <h2>ADRESSE</h2>
                    <p>Det utrolige teater</p>
                    <p>Havnegade 901</p>
                    <p>9000 Aalborg</p>
                    <p>EAN 5798003279845</p>
                    <p>CVR 1001 0012</p>
                    <br />
                    <p>Find vej på kort</p>
                </article>
                <div>
                    <article>
                        <h2>BILLETSERVICE</h2>
                        <p>Se åbningstider</p>
                        <a href='tel:96-31-80-80'>Billettelefon: +45 96 31 80 80</a>
                        <a href='mailto:billet@dut.dk'>billet @dut.dkr</a>
                    </article>
                    <article>
                        <h2>ADMINISTRATION</h2>
                        <a href='tel:96-31-80-90'>Telefon: +45 96 31 80 90</a>
                        <a href='mailto:adm@dut.dk'>adm@dut.dk</a>
                    </article>
                </div>
                <article>
                    <h2>PRAKTISK INFO</h2>
                    <p>Kontakt</p>
                    <p>Kom trygt i teatret</p>
                    <p>Presseside</p>
                    <p>Skoleforestillinger</p>
                    <p>Teatercaféen</p>
                    <p>Handelsbetingelser</p>
                </article>
            </div>
            <article id='media'>
                <a href="https://www.facebook.com" target='_blank' rel="noreferrer"><img src={Facebook} alt="Facebook" /></a>
                <a href="https://www.instagram.com" target='_blank' rel="noreferrer"><img src={Instagram} alt="Instagram" /></a>
                <a href="https://www.linkedin.com" target='_blank' rel="noreferrer"><img src={LinkedIn} alt="LinkedIn" /></a>
            </article>
        </footer>
    )
}