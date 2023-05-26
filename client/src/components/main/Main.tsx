import Header from './header/Header'
import About from './about/About'
import Services from './services/Services'
import Property from './property/Property'
import Reviews from './reviews/Reviews'
import Footer from './footer/Footer'
import { REALTY } from '../../types/enum'

const Main = () => {

  return (
    <div className='main' >
      <Header />
      <About />
      <Services />
      <Property postTag={REALTY.SALE} />
      <Property postTag={REALTY.RENT} />
      <Reviews />
      <Footer />
    </div>
  )
}

export default Main