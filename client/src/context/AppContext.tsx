import { createContext, useState, useEffect, type ReactNode, type RefObject } from 'react';
import { DeviceType } from '../types/types';
import Loader from '../components/ui/Loader';
const AppContext = createContext<{
    device: DeviceType;
    loader: boolean;
    setLoader: (s:boolean) => void;
}>({
    device: 'pc',
    loader: false,
    setLoader() { },
});

const AppContextProvider = ({ children, refApp }: { children: ReactNode; refApp: RefObject<HTMLDivElement> }) => {

    const [device, setDevice] = useState<DeviceType>('pc');
    const [loader, setLoader] = useState(false)
    


    useEffect(() => {
        const handleResize = () => {
            if (refApp?.current?.offsetWidth !== undefined) {
                if (refApp?.current?.offsetWidth < 450) {
                    setDevice('mobile');
                    document.body.classList.add('no-hover');
                } else if (refApp?.current?.offsetWidth < 950) {
                    setDevice('tablet');
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


    return <AppContext.Provider value={
        {
            device,
            loader,
            setLoader
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
