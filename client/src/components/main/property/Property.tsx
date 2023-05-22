import { useNavigate } from 'react-router-dom'
import '../../../style/main/properties.scss'
import { REALTY } from '../../../types/enum'
const list = [
  { id: 0, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
  { id: 1, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
  { id: 2, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
  { id: 3, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
  { id: 4, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
  { id: 5, city: "Kametnitha, Plovdiv", price: "82 000 €", size: "82 кв.м ", bg: "red" },
]

const Property = ({ realty }: { realty: REALTY }) => {

  const navigate = useNavigate()

  const navigateToSlider = (id: string | number) => {
    navigate(`/photos-${realty}/:setId`)
  }

  return (
    <div className="properties" id={realty.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}>
      <div className='wraper--content properties__wrap'>
        <h4 className='route--name'>Properties for {realty.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}</h4>
        <div className="properties__list">
          {
            list.map(it => <div className="properties__list-item">
              <img
                src={it.bg}
                className='style--image' onClick={() => navigateToSlider(it.id)}
              />
              <div className="properties__list-item_info">
                <span>{it.size}</span> - <span>{it.price}</span>
                <h5>{it.city}</h5>
              </div>
              <div className='properties__list-item_line' />
            </div>)
          }
        </div>
      </div>
      <div className='bg--content' style={{ background: REALTY.RENT === realty ? "#1A1F19" : "inherit" }}></div>
    </div>
  )
}

export default Property