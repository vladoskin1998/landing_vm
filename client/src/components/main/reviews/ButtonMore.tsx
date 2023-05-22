import '../../../style/main/reviews.scss'
import { Plus } from '../../svg/Plus'
const ButtonMore = ({ onClick = () => { } }: { onClick?: () => void }) => {
    return (
        <button className='reviews__list_button' onClick={onClick}>
            View more <Plus />
        </button>
    )
}

export default ButtonMore