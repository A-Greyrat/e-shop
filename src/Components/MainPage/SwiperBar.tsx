import {Swiper, SwiperSlide} from "swiper/react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pagination, Navigation} from "swiper";

import "./SwiperBar.css";
// import 'swiper/swiper-bundle.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperBarProps {
    imageArr: string[]
}

export default function SwiperBar({imageArr}: SwiperBarProps) {
    return (
        <div className="swiper-bar-root">

            <Swiper
                pagination
                navigation
                modules={[Pagination, Navigation]}
                loop
                autoplay>
                {
                    imageArr.map((x,index) =>
                        <SwiperSlide key={index}>
                            <img className="swiper-bar-img" src={x} alt=""/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}
