import Property from '../main/property/Property'
import { REALTY } from '../../types/enum'

const OwnObjects = () => {
  return (
    <div className='own'>
        <Property postTag={REALTY.OWN_OBJECT}/>
    </div> 
   
  )
}

export default OwnObjects