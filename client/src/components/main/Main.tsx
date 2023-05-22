import Header from './header/Header'
import About from './about/About'
import Services from './services/Services'
import Property from './property/Property'
import Reviews from './reviews/Reviews'
import Footer from './footer/Footer'
import { REALTY } from '../../types/enum'
import {animateScroll as scroll} from 'react-scroll';
import { useRef } from 'react'

const Main = () => {
  const scrollRef = useRef(scroll);
  return (
    <div className='main' >
        <Header />
        <About />
        <Services />
        <Property realty={REALTY.SALE}/>
        <Property realty={REALTY.RENT}/>
        <Reviews />
        <Footer />
    </div>
  )
}

export default Main