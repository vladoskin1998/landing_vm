import { useState } from "react";
import { MENU_LIST as list } from "../../../utils/constants";
import { Burger } from "../../svg/Burger";
import { ButtonClose } from "../../ui/ButtonClose";
import Messanger from "./Messanger";
import { Logo } from '../../svg/Logo'
const Menu = () => {
    const [open, setOpen] = useState(false);

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
                {list.map((it) => (
                    <button key={it} className="menu__modal-link">{it}</button>
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