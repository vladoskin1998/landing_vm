import { Line } from '../../svg/Line'
import '../../../style/main/footer.scss'
import { Message } from '../../svg/Message'
const Footer = () => {
  return (
    <div className='footer' id='Contacts'>
      <div className='wraper--content footer__wrap'>
        <div className='footer__buisness'>
          <h5 className='route--name'>Business Hours</h5>
          <div className='footer__buisness-day'>
            <p>Monday - Friday</p>
            <h6>09:00 am - 06:00 pm</h6>
            <p className='footer__buisness-day__week'>Saturday, Sunday </p>
            <span>by appointment only</span>
          </div>
        </div>
        <div className='footer__contact'>
          <h5 className='route--name'>Contacts</h5>
          <div >
            <h6>Social media</h6>
            <a href='https://instagram.com/vm_estate_agency?igshid=YmMyMTA2M2Y=' target='_blank' rel='noreferrer'>instagram</a>
            <a href='https://www.facebook.com/profile.php?id=100091716826651' target='_blank' rel='noreferrer'>facebook</a>
          </div>
          <div className='footer__contact-links'>
            <div>
              <h6>Phone Number</h6>
              <p>+3596608802</p>
              <a >telegram</a>
              <a>viber</a>
            </div>
            <div className='footer__contact-links_dev'>
              
              <a className='hover-link' >website development <Line /></a>
              <a className='footer__contact-links_viber'><Message/></a>
            </div>
            
          
          </div>
        </div>
      </div>
      <div className='footer__bg bg--content'></div>
    </div>
  )
}

export default Footer