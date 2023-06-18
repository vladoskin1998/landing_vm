import { PostsInterface, PostsTypeTag } from '../../../types/types'
import { useNavigate } from 'react-router-dom'
import { HREF } from '../../../utils/constants'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'

const PropertyList = ({ list, postTag }: { list: PostsInterface[], postTag: PostsTypeTag }) => {

    const navigate = useNavigate()
    const { isAuth } = useContext(AuthContext)
    const { deletePost } = useContext(DataContext)

    const navigateToSlider = (id: string) => {
        navigate(`/photos-${postTag}/${id}`)
    }

    const handlerDeletePost = (id: string) => {
        deletePost(id)
    }

    return (
        <>
            {
                list.map((it, index) => <div className="properties__list-item post__delete" key={index}>
                    {
                        isAuth && <button className='properties__add--but post__delete--delete'
                            onClick={() => handlerDeletePost(it._id)}
                        >
                            Delete post
                        </button>
                    }
                    <img
                        src={`${HREF}uploads/${it.bgFolderImages}`}
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