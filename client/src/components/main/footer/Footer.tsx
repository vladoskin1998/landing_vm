import { Line } from '../../svg/Line'
import '../../../style/main/footer.scss'
import { Message } from '../../svg/Message'
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

const Footer = () => {
    const { t } = useTranslation();
    const { device } = useContext(AppContext)
    return (
        <div className='footer' id='Contacts'>
            <div className='wraper--content footer__wrap'>
                <div className='footer__buisness'>
                    <h5 className='route--name'>{t('footer.title1')}</h5>
                    <div className='footer__buisness-day'>
                        <p>{t('footer.day')}</p>
                        <h6>{t('footer.time')}</h6>
                        <p className='footer__buisness-day__week'>{t('footer.weekend')}</p>
                        <span>{t('footer.weekend1')}</span>
                    </div>
                </div>
                <div className='footer__contact'>
                    <h5 className='route--name'>{t('footer.title2')}</h5>
                    <div >
                        <h6>{t('footer.socmed')}</h6>
                        <a href='https://instagram.com/vm_estate_agency?igshid=YmMyMTA2M2Y=' target='_blank' rel='noreferrer'>
                            instagram
                        </a>
                        <a href='https://www.facebook.com/profile.php?id=100091716826651' target='_blank' rel='noreferrer'>
                            facebook
                        </a>
                    </div>
                    <div className='footer__contact-links'>
                        <div>
                            <h6>{t('footer.pnnum')}</h6>
                            <a href="tel:+359896608802">+359896608802</a>
                            <a href="https://t.me/VeronykaMyronova" target='_blank'>telegram</a>
                            <a href="https://invite.viber.com/?g=wNM1wN-gNFFLCmTNh7NTjFwvAGRa0pU1" target='_blank'>viber</a>
                        </div>
                        <div className='footer__contact-links_dev'>
                            <a className='hover-link' href='https://instagram.com/ruslan_ray_?igshid=ZjE2NGZiNDQ=' target='_blank'>
                                {t('footer.dev')} <Line />
                            </a>
                            <a className='footer__contact-links_viber' href="https://invite.viber.com/?g=wNM1wN-gNFFLCmTNh7NTjFwvAGRa0pU1" target='_blank'>
                                <Message />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer__bg bg--content'></div>
        </div>
    )
}

export default Footer