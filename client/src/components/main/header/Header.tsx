import { Logo, LogoShort } from '../../svg/Logo'
import SliderHeader from './SliderHeader'
import LanguageSelect from './LanguageSelect'
import Menu from './Menu'
import HeaderContact from './HeaderContact'
import '../../../style/main/header.scss'
import Messanger from './Messanger'

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
                <div className='header__nav-titles'>
                    <h3 className='header__nav-titles_title'>Welcome to Estate Agency!</h3>
                    <h4 className='header__nav-titles_subtitle'>Your trusted solution for buying, selling and renting real estate.</h4>
                </div>
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