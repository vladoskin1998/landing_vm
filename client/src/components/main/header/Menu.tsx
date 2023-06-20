import { useState, useRef, useContext } from "react";
import { Burger } from "../../svg/Burger";
import { ButtonClose } from "../../ui/ButtonClose";
import Messanger from "./Messanger";
import { Logo } from '../../svg/Logo'
import { animateScroll as scroll, scroller } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { MENU_LIST } from "../../../utils/constants";
import { DataContext } from "../../../context/DataContext";

const Menu = () => {

    const [open, setOpen] = useState(false);
    const scrollerRef = useRef(scroller);
    const { isTag } = useContext(DataContext)

    const options = {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
    };
    const scrollTo = (link: string) => {
        scrollerRef?.current.scrollTo(link, options);
        setOpen(false)
    };

    const { t } = useTranslation();
    const list = t('header.menu_list').split('|')

    return (
        <div className="menu">

            <button onClick={() => setOpen(true)}>
                <Burger />
            </button>
            <div className={`menu__modal ${open ? "open" : "closed"}`}>
                <div className="menu__modal-close">
                    <div className="menu__modal-logo">
                        <Logo />
                    </div>
                    <ButtonClose onClick={() => setOpen(false)} />
                </div>
                {list.map((it, index) => (
                    MENU_LIST[index] === 'Rent' && !isTag.rent
                        || MENU_LIST[index] === 'Sale' && !isTag.sale
                        ? <></>
                        : <button key={it} className="menu__modal-link" 
                            onClick={() => { scrollTo(MENU_LIST[index]) }}
                        >{it}</button>
                ))}
                <div className="menu__modal-messanger">
                    <Messanger />
                </div>
            </div>
            {!open || <div className="menu__bg" onClick={() => setOpen(false)} />}
        </div>
    );
};

export default Menu;