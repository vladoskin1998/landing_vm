import { useTranslation } from 'react-i18next';
import '../../../style/main/reviews.scss'
import { Plus } from '../../svg/Plus'

const ButtonMore = ({ onClick = () => { } }: { onClick?: () => void }) => {

    const { t } = useTranslation();

    return (
        <button className='reviews__list_button' onClick={onClick}>
            {t('reviews.viewmore')} <Plus />
        </button>
    )
}

export default ButtonMore