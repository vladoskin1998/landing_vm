import { Close } from "../svg/Close"

export const ButtonClose = ({ onClick = () => { } }: { onClick?: () => void }) => {

    const handler = () => {
        onClick()
        console.log("exit");
        
    }
    return (
        <button className="style--close" onClick={handler}>
            <Close />
        </button>
    )
}
