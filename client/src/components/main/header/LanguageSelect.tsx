import { useContext, useEffect, useState } from 'react'
import { LANGUAGE_LIST as list } from '../../../utils/constants'
import { Plus } from '../../svg/Plus'
import { LanguageType } from '../../../types/types'
import { AppContext } from '../../../context/AppContext'

const LanguageSelect = () => {

    const [open, setOpen] = useState(false)
    const [lang, setLang] = useState(list)
    const { changeLanguage,language } = useContext(AppContext)

    useEffect(() => {
        chageLang(language)
    }, [language])

    const chageLang = (elem: LanguageType) => {
        changeLanguage(elem)
        setLang(
            s => ([elem, ...s.filter(it => elem !== it)])
        )
        setOpen(false)
    }

    return (
        <div className='language__select'>
            <div className='language__select-list'>
                {
                    !open
                        ? <div onClick={() => setOpen(true)} className="language__select-list_item">{language}</div>
                        : <>
                            {
                                lang.map(it => <div onClick={() => chageLang(it)} className="language__select-list_item">{it}</div>)
                            }
                            <div className='language__select-list__bg' onClick={() => setOpen(false)} />
                        </>
                }
            </div>
            <div className={`language__select-plus language__select-plus${open ? "--active" : "--passive"}`}>
                <Plus />
            </div>
        </div>
    )
}

export default LanguageSelect