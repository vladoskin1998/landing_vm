import { PostsInterface, PostsTypeTag } from '../../../types/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { HREF } from '../../../utils/constants'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'
import { REALTY } from '../../../types/enum'

const PropertyList = ({ list, postTag }: { list: PostsInterface[], postTag: PostsTypeTag }) => {

    const navigate = useNavigate()
    const { isAuth } = useContext(AuthContext)
    const { deletePost, changeTagPost } = useContext(DataContext)
    const location = useLocation()

    const navigateToSlider = (id: string) => {
        navigate(`/photos-${postTag}/${id}`)
    }

    const handlerDeletePost = (id: string) => {
        deletePost(id)
    }

    const handlerChangePostTag = (id: string, tag: PostsTypeTag) => {
        alert("Do you want to change post tag?")
        changeTagPost(id, tag)
    }

    console.log(location.pathname);

    return (
        <>
            {
                list.map((it, index) => <div className="properties__list-item post__delete" key={index}>
                    {
                        isAuth &&
                        <div className="post__delete--button">
                            {
                                location.pathname === '/photos-own'
                                    ? <>
                                        <button className='properties__add--but'
                                            onClick={() => handlerChangePostTag(it._id, REALTY.RENT)}
                                        >  Change to rent </button>
                                        <button className='properties__add--but'
                                            onClick={() => handlerChangePostTag(it._id, REALTY.SALE)}
                                        >  Change to sale </button>
                                    </>
                                    : <button className='properties__add--but'
                                        onClick={() => handlerChangePostTag(it._id, REALTY.OWN_OBJECT)}>
                                        Change to own
                                    </button>
                            }
                            <button className='properties__add--but'
                                onClick={() => handlerDeletePost(it._id)}
                            >
                                Delete post
                            </button>
                        </div>

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