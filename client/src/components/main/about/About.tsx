import '../../../style/main/about.scss'
import { useTranslation } from 'react-i18next';

const About = () => {

  const { t } = useTranslation();
  const list = t("about.submain").split('|')

  return (
    <div className="about" id='About'>
      <div className="about__wrap wraper--content">
        <div className="about__images">
          <div className="about__images-row">
            <div className="style--image" />
            <div className="style--image" />
          </div>
          <p className="about__images-p">{t("about.foot")}</p>
        </div>
        <div className="about__text">
          <h4 className='route--name'>{t('about.title')}</h4>
          <p className='about__text-p1'>{t('about.subtitle')}</p>
          <h5>{t('about.main')}</h5>
          <ul className='about__text-u1'>
            {
              list.map((it, index) => <li key={index}>{it}</li>)
            }
          </ul>
          <p className='about__text-pfoot'>{t("about.foot")}</p>
        </div>
      </div>

      <div className='about__bg bg--content' />
    </div>
  )
}

export default About