import { PostsInterface, PostsTypeTag } from '../../../types/types'
import { useNavigate } from 'react-router-dom'
import { HREF } from '../../../utils/constants'
const PropertyList = ({ list, postTag }: { list: PostsInterface[], postTag: PostsTypeTag }) => {

    const navigate = useNavigate()

    const navigateToSlider = (id: string) => {
        navigate(`/photos-${postTag}/${id}`)
    }

    return (
        <>
            {
                list.map((it, index) => <div className="properties__list-item" key={index}>
                    <img
                        src={ `${HREF}uploads/${it.bgFolderImages})`}
                        className='style--image' onClick={() => navigateToSlider(it._id)}
                    />
                    <div className="properties__list-item_info">
                        <span>{it.area}</span> - <span>{it.price}</span>
                        <h5>{it.city} / {it.district}</h5>
                    </div>
                    <div className='properties__list-item_line' />
                </div>)
            }
        </>
    )
}

export default PropertyList