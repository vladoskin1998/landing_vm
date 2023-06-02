import { Logo, LogoShort } from '../../svg/Logo'
import SliderHeader from './SliderHeader'
import LanguageSelect from './LanguageSelect'
import Menu from './Menu'
import HeaderContact from './HeaderContact'
import '../../../style/main/header.scss'
import Messanger from './Messanger'
import { HeaderNavTitles } from './HeaderNavTitles'

const Header = () => {

    return (
        <div className='header' id='Home'>
            <div className='header__nav'>
                <div className='header__nav-messanger'>
                    <div>
                        <div className='header__nav-messanger-logo'>
                            <Logo />
                        </div>
                        <div className='header__nav-messanger-logoshort'>
                            <LogoShort />
                        </div>
                    </div>
                    <div className='header__nav-messanger-links'>
                        <Messanger />
                        <LanguageSelect />
                    </div>
                    <Menu />
                </div>
                <HeaderNavTitles />
                <div className='header__nav-slide_contact'>
                    <HeaderContact />
                </div>
            </div>
            <SliderHeader />
            <div className='header__slide_contact'>
                <HeaderContact />
            </div>
        </div>

    )
}

export default Header