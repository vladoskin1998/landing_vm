import { Suspense } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Main from './components/main/Main';
import SliderPhoto from './components/slider-photo/SliderPhoto';
import NoMatch from './components/ui/NoMatch';
import Loader from './components/ui/Loader';

const App = () => {
  return (
    <div className='app'>
      <Suspense fallback={<Loader />}>
        <HashRouter>
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
        </HashRouter>
      </Suspense>
    </div>
  )
}

export default App
