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
              <p>+3596608802</p>
              {
                device === 'pc'
                  ? <>
                    <a href="https://t.me/имя_пользователя">telegram</a>
                    <a href="https://msng.link/vi/+3596608802">viber</a>

                  </>
                  : <>
                    <a href="tg://resolve?domain=имя_пользователя">telegram</a>
                    <a href="viber://chat?number=номер_телефона">viber</a>
                  </>
              }

            </div>
            <div className='footer__contact-links_dev'>
              <a className='hover-link'>
                {t('footer.dev')} <Line />
              </a>
              {
                device === 'pc'
                  ? <a className='footer__contact-links_viber' href="https://msng.link/vi/3596608802">
                    <Message />
                  </a>
                  : <a className='footer__contact-links_viber' href="viber://chat?number=3596608802">
                    <Message />
                  </a>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='footer__bg bg--content'></div>
    </div>
  )
}

export default Footer