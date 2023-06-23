import '../../../style/main/services.scss'
import { useTranslation } from 'react-i18next';
const Services = () => {
    const { t } = useTranslation();
    const list = t('service.list').split('|');

    return (
        <div className='services' id='Services'>
            <div className='services__body wraper--content'>
                <h4 className='route--name'> {t('service.title')}</h4>
                <ul>
                    {
                        list.map((it: string, index: number) => <li key={index}>{it}</li>)
                    }
                </ul>
            </div>

            <div className='services_bg style--image bg--content' />
        </div>
    )
}

export default Services