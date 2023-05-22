import { useState } from 'react'
import { LANGUAGE_LIST as list } from '../../../utils/constants'
import { Plus } from '../../svg/Plus'

const LanguageSelect = () => {

    const [open, setOpen] = useState(false)
    const [lang, setLang] = useState(list)

    const chageLang = (elem: string) => {
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
                        ? <div onClick={() => setOpen(true)} className="language__select-list_item">{lang[0]}</div>
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