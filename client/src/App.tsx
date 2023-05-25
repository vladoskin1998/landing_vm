import { Suspense, useRef } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Main from './components/main/Main';
import SliderPhoto from './components/slider-photo/SliderPhoto';
import NoMatch from './components/ui/NoMatch';
import Loader from './components/ui/Loader';
import { ContextProvider } from './context/context';
import { Login } from './components/admin/login';
const App = () => {

  const refApp = useRef(null)

  return (
    <div className='app' ref={refApp}>
      <ContextProvider refApp={refApp}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path="photos-rent">
              <Route path=':setId' element={<SliderPhoto />} />
            </Route>
            <Route path="photos-sale">
              <Route path=':setId' element={<SliderPhoto />} />
            </Route>
            <Route path='*' element={<NoMatch />} />
          </Routes>
          <Login />
        </Suspense>
      </ContextProvider>
    </div>
  )
}

export default App
