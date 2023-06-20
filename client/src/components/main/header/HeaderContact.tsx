import { useTranslation } from 'react-i18next';
import '../../../style/main/header.scss'
import { scroller } from 'react-scroll';
import { useRef } from 'react';
import { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

const HeaderContact = () => {
    const { t } = useTranslation();
    const options = {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
    };
    const scrollerRef = useRef(scroller);
    const { device } = useContext(AppContext)
    const scrollTo = (link: string) => {
        scrollerRef?.current.scrollTo(link, options);
    };

    return (
        <div className='header__nav-buttons'>
            <button onClick={() => { scrollTo("Contacts") }}>{t('header.cont')}</button>
            {
                device === 'pc'
                    ? <button onClick={() => { scrollTo("Contacts") }}>+359896608802</button>
                    : <button>
                        <a href="tel:+359896608802">+359896608802</a>
                    </button>
            }
        </div>
    )
}

export default HeaderContact