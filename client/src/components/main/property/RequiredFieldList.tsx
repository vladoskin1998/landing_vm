import { firstUpperLetter } from '../../../utils/methods'

export const RequiredFieldList = ({ reqFields, setReqFields }: { reqFields: Record<string, string>, setReqFields: (s: Record<string, string>) => void }) => {

    const handlerChangeReqFields = (key: string, value: string) => {
        setReqFields({
            ...reqFields, 
            [key]: value
        })
    }

    return (

        <div className='login_item'>
            <h4 className='login__text'>Main field</h4>
            <div className='add__req'>
                {
                    Object.keys(reqFields).map((it, index) => <div className='login_item' key={index}>
                        <h4 className='login__text'>
                            {firstUpperLetter(it)}
                            {Boolean(reqFields[it].length) || <span className='login__text login__text-req'> Required field</span>}
                        </h4>
                        <input type='text' className='login__input'
                            value={reqFields[it]}
                            placeholder={firstUpperLetter(it)}
                            onChange={
                                (e) => { handlerChangeReqFields(it, e.target.value) }
                            }
                        />
                    </div>)
                }
            </div>
        </div>
    )
}
