import { useTranslation } from 'react-i18next';
import '../../../style/main/header.scss'
import { animateScroll as scroll, scroller } from 'react-scroll';
import { useRef } from 'react';

const HeaderContact = () => {
    const { t } = useTranslation();
    const options = {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
    };
    const scrollerRef = useRef(scroller);

    const scrollTo = (link: string) => {
        scrollerRef?.current.scrollTo(link, options);
    };

    return (
        <div className='header__nav-buttons'>
            <button onClick={() => { scrollTo("Contacts") }}>{t('header.cont')}</button>
            <button>+359896608802</button>
        </div>
    )
}

export default HeaderContact