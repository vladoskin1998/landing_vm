import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import { Logo } from "../svg/Logo";
import '../../style/media/media.scss'
import HeaderContact from "../main/header/HeaderContact";
import ButtonMore from "../main/reviews/ButtonMore";
import { ButtonClose } from "../ui/ButtonClose";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ShevronsLeft, ShevronsRight } from "../svg/Shevrons";
import { LazyLoadTypes } from 'react-slick';
import { HREF } from "../../utils/constants";
import { PostsInterface, AdditionalFieldType } from "../../types/types";
import { $api } from "../../api/api";
import { AxiosResponse } from 'axios';
import { PostsTypeTag } from "../../types/types";
import { useTranslation } from "react-i18next";

const SliderPhoto = ({ postTag }: { postTag: PostsTypeTag }) => {

  const navigate = useNavigate()

  const { setId } = useParams()
  const [post, setPost] = useState<PostsInterface | undefined>()
  const [moreButton, setMoreButton] = useState(false)

  const refSlick = useRef<Slider>(null);
  const [count, setCount] = useState(1)
  const { t } = useTranslation();

  useEffect(() => {
    $api.post("/posts/get-one-post", { _id: setId })
      .then(
        (r: AxiosResponse<PostsInterface>): void => {
          setPost({ ...r.data, description: r.data.description || '' })
        }
      )
      .catch()
  }, [])

  let settings = {
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
          <div> {count}/{(post?.images?.length || 0)}</div>
        </div>
        <div className="media__nav-text">
          <h5>{t(`properties.${postTag}`)}</h5>
          <ButtonClose onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="media__wrap_content">
        <div className="media__slider">
          <Slider {...settings} ref={refSlick}>
            {
              post?.images.map((it, index) => <div className="style--image" style={{backgroundImage: `url(${HREF}uploads/${it})`}} key={index} />)
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
          <h6>{t('slide.area')}: {post?.area}</h6>
          <h6>{t('slide.price')}: {post?.price}</h6>
          <h6>{t('slide.city')}: {post?.district}, {post?.city}</h6>
          {
            post?.additionalFields?.length
              ? JSON.parse(post?.additionalFields).map((it: AdditionalFieldType, index: number) =>
                <h6 key={index}>{it.label}: {it.value}</h6>)
              : <></>
          }
          <p className="media__info-desc">
            {moreButton
              ? post?.description
              : post?.description?.slice(0, 200) + ((post?.description.length || 0) as number > 200 ? "..." : '')}
          </p>
          {
            (moreButton || (post?.description.length || 0) as number < 200)
              ? <></>
              : <div className="media__info-more" onClick={() => setMoreButton(true)}>
                <ButtonMore />
              </div>
          }
          <HeaderContact />
        </div>
      </div>

    </div>

  )
}

export default SliderPhoto