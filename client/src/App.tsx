import { Suspense, useRef } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Main from './components/main/Main';
import SliderPhoto from './components/slider-photo/SliderPhoto';
import NoMatch from './components/ui/NoMatch';
import Loader from './components/ui/Loader';
import { DataContextProvider } from './context/DataContext';
import { Login } from './components/admin/Login';
import { AppContextProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import { REALTY } from './types/enum';
import AuthRoute from './components/admin/AuthRoute';
import OwnObjects from './components/admin/OwnObjects';

const App = () => {

  const refApp = useRef(null)

  return (
    <div className='app' ref={refApp}>
      <AppContextProvider refApp={refApp}>
        <AuthContextProvider>
          <DataContextProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/' element={<Main />} />
                <Route path="photos-rent">
                  <Route path=':setId' element={<SliderPhoto postTag={REALTY.RENT} />} />
                </Route>
                <Route path="photos-sale">
                  <Route path=':setId' element={<SliderPhoto postTag={REALTY.SALE} />} />
                </Route>

                {/* <AuthRoute> */}
                <Route path="photos-own">
                  <Route path=':setId' element={
                     <AuthRoute>
                       <SliderPhoto postTag={REALTY.OWN_OBJECT} />
                     </AuthRoute>
                   
                  } />
                  <Route index element={
                     <AuthRoute>
                         <OwnObjects />
                     </AuthRoute>
                  } />
                </Route>
                {/* </AuthRoute> */}

                <Route path='*' element={<NoMatch />} />
              </Routes>
              <Login />
            </Suspense>
          </DataContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </div>
  )
}

export default App
