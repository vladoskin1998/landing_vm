import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import { Logo } from "../svg/Logo";
import '../../style/media/media.scss'
import HeaderContact from "../main/header/HeaderContact";
import ButtonMore from "../main/reviews/ButtonMore";
import { ButtonClose } from "../ui/ButtonClose";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ShevronsLeft, ShevronsRight } from "../svg/Shevrons";
import { LazyLoadTypes } from 'react-slick';

const list = [
  "link",
  "link",
  "link",
  "link",
]

const SliderPhoto = () => {

  const navigate = useNavigate()

  const refSlick = useRef<Slider>(null);
  const [count, setCount] = useState(1)

  var settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    afterChange: (c: number) => setCount(c + 1)

  };

  return (
    <div className="media">
      <div className="media__nav">
        <div className="media__nav-slider">
          <Logo />
          <div> {count}/8</div>
        </div>
        <div className="media__nav-text">
          <h5>Properties for Sale</h5>
          <ButtonClose onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="media__wrap_content">
        <div className="media__slider ">
          <Slider {...settings} ref={refSlick}>
            {
              list.map(it => <img src={it} />)
            }
          </Slider>
          <div className="media__slider-nav">
            <button onClick={() => refSlick?.current?.slickPrev()}>
              <ShevronsLeft />
            </button>
            <button onClick={() => refSlick?.current?.slickNext()}>
              <ShevronsRight />
            </button>
          </div>
        </div>

        <div className="media__info">
          <h6>Обща площ: 72 кв. м.</h6>
          <h6>Цена: 63 400 евро</h6>
          <h6>Город: Kametnitha, Plovdiv</h6>
          <p className="media__info-desc">
            100% при подписване на нотариален акт за собственост
            Предлагаме за продажба напълно готов за живеене или отдаване под наем просторен апартамент с тераса – мебелите и уредите остават. Има голяма баня.
            Комплекс "Блу уотър" се намира на красиво и живописно място, наречено Свети Влас. Мястото, където се срещат планините и морето, където е най-чистият въздух и нежното море...
          </p>
          <div className="media__info-more">
            <ButtonMore />
          </div>

          <HeaderContact />
        </div>
      </div>

    </div>

  )
}

export default SliderPhoto