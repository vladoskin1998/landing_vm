import { createContext, useState, useEffect, type ReactNode, type RefObject } from 'react';
import { DeviceType, LanguageType } from '../types/types';
import Loader from '../components/ui/Loader';
import { LANGUAGE } from '../types/enum';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_LIST } from '../utils/constants';
const AppContext = createContext<{
    device: DeviceType;
    loader: boolean;
    setLoader: (s: boolean) => void;
    changeLanguage: (l: LanguageType) => void;
    language: LanguageType;
}>({
    device: 'pc',
    loader: false,
    setLoader() { },
    changeLanguage() { },
    language: LANGUAGE.EN
});

const AppContextProvider = ({ children, refApp }: { children: ReactNode; refApp: RefObject<HTMLDivElement> }) => {

    const { i18n } = useTranslation();
    const [device, setDevice] = useState<DeviceType>('pc');
    const [loader, setLoader] = useState(false)
    const [language, setLanguage] = useState<LanguageType>(LANGUAGE.EN)

    useEffect(() => {
        const handleResize = () => {
            if (refApp?.current?.offsetWidth !== undefined) {
                if (refApp?.current?.offsetWidth < 450) {
                    setDevice('mob');
                    document.body.classList.add('no-hover');
                } else {
                    setDevice('pc');
                    document.body.classList.remove('no-hover');
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [refApp?.current?.offsetWidth]);

    useEffect(() => {
        

        const deviceLanguage = navigator.language.slice(0,2) as LanguageType
        console.log(deviceLanguage.slice(0,2));
        

        if (LANGUAGE_LIST.includes(deviceLanguage)) {
            changeLanguage(deviceLanguage)
        }

    }, [])


    const changeLanguage = (l: LanguageType) => {
        i18n.changeLanguage(l);
        setLanguage(l)
    }

    return <AppContext.Provider value={
        {
            device,
            loader,
            setLoader,
            changeLanguage,
            language
        }
    }>
        {children}
        {
            loader &&
            <Loader />
        }

    </AppContext.Provider>;
};

export { AppContextProvider, AppContext };
