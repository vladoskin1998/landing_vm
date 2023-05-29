import { useNavigate } from 'react-router-dom'
import '../../../style/main/properties.scss'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../context/DataContext' 
import ModalAdd from './ModalAdd'
import { PostsTypeTag } from '../../../types/types'
import { REALTY } from '../../../types/enum'
import PropertyList from './PropertyList'
import { firstUpperLetter } from '../../../utils/methods'
import { AuthContext } from '../../../context/AuthContext'

const Property = ({ postTag }: { postTag: PostsTypeTag }) => {

  const { isAuth } = useContext(AuthContext)
  const { listPost } = useContext(DataContext)


  return (
    <div className="properties" id={firstUpperLetter(postTag)}>
      <div className='wraper--content properties__wrap'>
        <h4 className='route--name'>Properties for {firstUpperLetter(postTag)}</h4>
        <div className="properties__list">
          <PropertyList
            postTag={postTag}
            list={listPost.filter(it => it.tag === postTag)}
          />
        </div>
      </div>
      <div className='bg--content' style={{ background: REALTY.RENT === postTag ? "#1A1F19" : "inherit" }}></div>
      {
        isAuth &&
        <div className='properties__add'>

          <ModalAdd postTag={postTag} />
        </div>
      }

    </div>
  )
}

export default Property