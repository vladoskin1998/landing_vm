import '../../../style/main/about.scss'
import { ABOUT_LIST as list } from '../../../utils/constants'
const About = () => {
  return (
    <div className="about" id='About'>
      <div className="about__wrap wraper--content">
        <div className="about__images">
          <div className="about__images-row">
            <div className="style--image" />
            <div className="style--image" />
          </div>

          <p className="about__images-p">Our vision is to be the most trusted and respected real Estate Agency in Plovdiv </p>
        </div>
        <div className="about__text">
          <h4 className='route--name'>About us</h4>
          <p className='about__text-p1'>Estate Agency была основана профессионалами, которые стоят у истоков болгарского рынка недвижимости. Изначально являясь надежной компанией, которая придерживаеться наилучшей ценовой политики для своих клиентов.</p>
          <h5>Главные принципы нашей работы:</h5>
          <ul className='about__text-u1'>
            {
              list.map(it => <li>{it}</li>)
            }
          </ul>
          <p className='about__text-pfoot'>Our vision is to be the most trusted and respected real Estate Agency in Plovdiv </p>
        </div>
      </div>

      <div className='about__bg bg--content' />
    </div>
  )
}

export default About