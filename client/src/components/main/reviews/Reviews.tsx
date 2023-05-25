import '../../../style/main/reviews.scss'
import ReviewsForm from './ReviewsForm'
import ButtonMore from './ButtonMore'
const list = [
  { id: 0, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' },
  { id: 1, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' },
  { id: 2, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' },
  { id: 3, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' },
  { id: 4, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' },
  { id: 5, text: 'In hac habitasse platea dictumst. Sed malesuada volutpat dolor a consectetur.', name: 'Plamen Petkov' }
]

const Reviews = () => {
  return (
    <div className='reviews' id='Reviews'>
      <h4 className='route--name'>Reviews</h4>
      <h2>Happy Clients</h2>
      <div className='reviews__list'>
        {
          list.map((it, index) => <div className='reviews__list-item' key={index}>
            <div className='reviews__list-item_gate'>
              <span>“</span> <div />
            </div>
            <p>{it.text}</p>
            <h6>- {it.name}</h6>
          </div>)
        }
        <ButtonMore />
      </div>
      <h4 className='reviews__title'>Thanks to you we are becoming better!</h4>
      <ReviewsForm />
    </div>
  )
}

export default Reviews