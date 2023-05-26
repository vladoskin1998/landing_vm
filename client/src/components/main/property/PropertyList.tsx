import React from 'react'
import { PostsType, PostsTypeTag } from '../../../types/types'
import { useNavigate } from 'react-router-dom'

const PropertyList = ({ list, postTag }: { list: PostsType[], postTag: PostsTypeTag }) => {

    const navigate = useNavigate()

    const navigateToSlider = (id: string) => {
        navigate(`/photos-${postTag}/:setId`)
    }

    return (
        <>
            {
                list.map((it, index) => <div className="properties__list-item" key={index}>
                    <img
                        src={it.bgFolderImages}
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