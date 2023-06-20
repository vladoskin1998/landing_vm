import { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

export const HeaderNavTitles = () => {
    const { language, device } = useContext(AppContext)
    return (
        <div className='header__nav-titles'>
            <div className={
                `header__nav-titles_${language}${device === 'mob' ? "--mob": ""} style--image`
            } />
        </div>
    )
}
