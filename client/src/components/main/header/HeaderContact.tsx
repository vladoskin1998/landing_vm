import { useTranslation } from 'react-i18next';
import '../../../style/main/header.scss'

const HeaderContact = () => {
    const { t } = useTranslation();

    return (
        <div className='header__nav-buttons'>
            <button>{t('header.cont')}</button>
            <button>+3596608802</button>
        </div>
    )
}

export default HeaderContact