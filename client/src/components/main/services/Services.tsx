import '../../../style/main/services.scss'
import { SERVICES_LIST as list } from '../../../utils/constants'
const Services = () => {
  return (
    <div className='services' id='Services'>
      <div className='services__body wraper--content'>
        <h4 className='route--name'>Services</h4>
      <ul>
        {
          list.map((it,index) => <li key={index}>{it}</li>)
        }
      </ul>
      </div>
      
      <div className='services_bg style--image bg--content'/>
    </div>
  )
}

export default Services